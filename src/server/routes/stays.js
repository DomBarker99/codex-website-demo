import { Router } from "express";
import { stays } from "../data/stays.js";

export const staysRouter = Router();

staysRouter.get("/", (request, response) => {
  const unknownParameters = Object.keys(request.query).filter((key) => key !== "destination");
  if (unknownParameters.length > 0) {
    return response.status(400).json({ error: "Only the destination query parameter is supported." });
  }

  const { destination = "" } = request.query;
  if (typeof destination !== "string" || destination.length > 80) {
    return response.status(400).json({ error: "Destination must be a single string of at most 80 characters." });
  }

  const city = destination.trim().toLowerCase();
  const matchingStays = stays.filter((stay) => city === "" || stay.city.toLowerCase() === city);

  // Keep the complete destination list even when the results are filtered.
  const destinations = [...new Set(stays.map((stay) => stay.city))].sort();
  response.json({ stays: matchingStays, count: matchingStays.length, destinations });
});
