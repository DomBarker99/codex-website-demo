import { existsSync } from "node:fs";
import { join } from "node:path";
import { createApp, clientDist } from "./app.js";

const port = Number(process.env.PORT || 3001);
const serveClient = process.argv.includes("--serve-client");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}
if (serveClient && !existsSync(join(clientDist, "index.html"))) {
  throw new Error("The React build is missing. Run npm run build before npm start.");
}

const server = createApp({ serveClient }).listen(port, "127.0.0.1", () => {
  console.log(`${serveClient ? "Weekend Stay" : "Weekend Stay API"}: http://127.0.0.1:${port}`);
});
server.on("error", (error) => {
  console.error(`Could not start the server: ${error.message}`);
  process.exitCode = 1;
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => server.close(() => process.exit(0)));
}
