// In development Vite proxies /api to Express; the production server serves both.
export async function getStays(destination, signal) {
  const query = new URLSearchParams();
  if (destination) query.set("destination", destination);
  const response = await fetch(`/api/stays?${query}`, { signal });
  if (!response.ok) {
    throw new Error(`The stays API returned HTTP ${response.status}.`);
  }
  return response.json();
}
