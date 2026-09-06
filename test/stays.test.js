import assert from "node:assert/strict";
import { once } from "node:events";
import { after, before, test } from "node:test";
import { createApp } from "../src/server/app.js";

let server;
let baseUrl;
const featuredIds = ["harbor-house", "redwood-hideaway", "sunset-loft", "cypress-cottage", "north-beach-nook", "boardwalk-bungalow"];
const allDestinations = ["Monterey", "San Francisco", "Santa Cruz"];

before(async () => {
  server = createApp().listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.match(response.headers.get("content-type"), /application\/json/);
  return { response, body: await response.json() };
}

test("health endpoint reports the API is running", async () => {
  const { response, body } = await get("/api/health");
  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: "ok" });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-powered-by"), null);
});

test("all six stays are returned in their original featured order", async () => {
  const { response, body } = await get("/api/stays");
  assert.equal(response.status, 200);
  assert.equal(body.count, 6);
  assert.deepEqual(body.stays.map((stay) => stay.id), featuredIds);
  assert.deepEqual(body.stays.map((stay) => stay.price), [185, 125, 240, 165, 210, 145]);
  assert.deepEqual(body.destinations, allDestinations);
  for (const stay of body.stays) {
    assert.equal(typeof stay.name, "string");
    assert(Number.isInteger(stay.price) && stay.price > 0);
    assert(Number.isInteger(stay.guests) && stay.guests > 0);
  }
});

for (const city of allDestinations) {
  test(`destination filter returns only the two ${city} stays`, async () => {
    const { response, body } = await get(`/api/stays?destination=${encodeURIComponent(city)}`);
    assert.equal(response.status, 200);
    assert.equal(body.count, 2);
    assert.equal(body.stays.length, 2);
    assert(body.stays.every((stay) => stay.city === city));
    assert.deepEqual(body.destinations, allDestinations);
  });
}

test("destination matching ignores surrounding whitespace and case", async () => {
  const { response, body } = await get("/api/stays?destination=%20MONTEREY%20");
  assert.equal(response.status, 200);
  assert.deepEqual(body.stays.map((stay) => stay.id), ["harbor-house", "cypress-cottage"]);
});

test("an unknown destination returns a valid empty result", async () => {
  const { response, body } = await get("/api/stays?destination=Atlantis");
  assert.equal(response.status, 200);
  assert.deepEqual(body, { stays: [], count: 0, destinations: allDestinations });
});

test("an empty destination restores all stays without mutating featured order", async () => {
  await get("/api/stays?destination=Monterey");
  const { response, body } = await get("/api/stays?destination=");
  assert.equal(response.status, 200);
  assert.equal(body.count, 6);
  assert.deepEqual(body.stays.map((stay) => stay.id), featuredIds);
});

for (const [label, query] of [
  ["repeated destination", "destination=Monterey&destination=Santa%20Cruz"],
  ["overlong destination", `destination=${"a".repeat(81)}`],
  ["unsupported parameter", "unexpected=true"],
  ["nested destination", "destination[city]=Monterey"],
]) {
  test(`invalid request: ${label} returns a useful 400 error`, async () => {
    const { response, body } = await get(`/api/stays?${query}`);
    assert.equal(response.status, 400);
    assert.equal(typeof body.error, "string");
    assert(body.error.length > 0);
    assert.equal(body.stays, undefined);
  });
}

test("unknown API routes return JSON 404, not a frontend HTML page", async () => {
  const { response, body } = await get("/api/not-a-route");
  assert.equal(response.status, 404);
  assert.deepEqual(body, { error: "API route not found." });
});

test("the read-only catalog does not accept POST changes", async () => {
  const response = await fetch(`${baseUrl}/api/stays`, { method: "POST" });
  assert.equal(response.status, 404);
  const { body } = await get("/api/stays");
  assert.deepEqual(body.stays.map((stay) => stay.id), featuredIds);
});
