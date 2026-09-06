import express from "express";
import { fileURLToPath } from "node:url";
import { staysRouter } from "./routes/stays.js";

export const clientDist = fileURLToPath(new URL("../../dist/", import.meta.url));

// Tests can create the app on a temporary port without starting the CLI server.
export function createApp({ serveClient = false } = {}) {
  const app = express();
  app.disable("x-powered-by");

  app.use("/api", (_request, response, next) => {
    response.set("Cache-Control", "no-store");
    next();
  });
  app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
  app.use("/api/stays", staysRouter);
  app.use("/api", (_request, response) => {
    response.status(404).json({ error: "API route not found." });
  });

  if (serveClient) app.use(express.static(clientDist));

  app.use((_request, response) => response.status(404).json({ error: "Route not found." }));
  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: "An unexpected server error occurred." });
  });

  return app;
}
