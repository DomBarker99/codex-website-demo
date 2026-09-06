# Weekend Stay

A small full-stack hotel-listing project for a hands-on coding-agent demonstration: **React + Vite in the browser, Node.js + Express on the server, and real API tests**. One npm package, not a monorepo or a production booking service.

All six stays, prices, descriptions, and CSS illustrations are fictional. There are no databases, accounts, API keys, paid services, real bookings, or payments.

## Install and run

Requires **Node.js 22.12 or newer** and npm. A current LTS release from <https://nodejs.org/> is recommended. Check `node --version` and `npm --version` first.

```sh
git clone https://github.com/DomBarker99/codex-website-demo.git
cd codex-website-demo
npm install
npm run dev
```

Alternatively, an installed/authenticated GitHub CLI can clone it with `gh repo clone DomBarker99/codex-website-demo`.

Open **http://127.0.0.1:5173**. The terminal runs two processes with labeled output:

- **web**: Vite serves React and updates the browser as you edit.
- **api**: Express serves JSON at **http://127.0.0.1:3001/api/stays** and restarts when server files change.

**Ctrl+C stops both.** Unlike the first static version, double-clicking `index.html` is no longer a run method. Dependencies need internet for installation; the running app uses only local assets and local API requests.

If you already cloned the static starter, first inspect `git status`, preserve your own changes, and pull the updated repository before installing dependencies.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies; `package-lock.json` records exact resolved versions |
| `npm ci` | Install exactly from the lockfile, useful for a fresh checkout or CI |
| `npm run dev` | Start Vite and Express together with live reload/restart |
| `npm test` | Run HTTP API tests with Node's built-in test runner, using a temporary port |
| `npm run test:watch` | Rerun API tests when code changes |
| `npm run build` | Compile the React frontend into `dist/` |
| `npm start` | Serve the built frontend and API together at http://127.0.0.1:3001 |

For a production-build check, stop the dev processes, run `npm run build`, then `npm start`. This is a local demo server, bound to loopback, not a deployment configuration. Generated `dist/` files and `node_modules/` are ignored by Git. Builds preserve previously generated assets rather than deleting them automatically.

If port 3001 is occupied, stop **your own** earlier demo process, or use `PORT=3002 npm run dev` on macOS/Linux (`$env:PORT=3002; npm run dev` in PowerShell). Vite's API proxy reads the same setting. Vite uses port 5173 and exits with an error rather than silently changing the URL if that port is occupied. Do not stop unrelated processes.

## Find your way around

```text
package.json                 dependencies and commands
package-lock.json            exact dependency versions
vite.config.js               React tooling and local API proxy
index.html                   React's HTML entry point
src/
  client/
    main.jsx                 mounts React and imports styles
    App.jsx                  page, selection, fetching lifecycle, UI states
    api.js                   browser-to-server HTTP request
    styles.css               responsive layout and CSS artwork
    components/
      SearchFilters.jsx      labeled destination selector and reset
      StayCard.jsx           one reusable hotel card
  server/
    index.js                 starts the server and validates its port/build
    app.js                   Express setup, health route, static hosting, errors
    routes/stays.js          query validation and server-side filtering
    data/stays.js            six fictional fixtures in featured order
test/
  stays.test.js              HTTP tests against the actual Express app
AGENTS.md                    standing guidance for a coding agent
```

**Trace one interaction:** select Monterey → React state changes → `api.js` requests `/api/stays?destination=Monterey` → Vite proxies to Express → the route validates and filters fixtures → JSON returns → React renders two `StayCard` components.

The dropdown options come from API metadata, not a duplicate client-side fixture list. Loading, no-results, and request-failure states are explicit. A failed request has a **Try again** action; an aborted older request cannot overwrite a newer selection. React Strict Mode may start and cancel an extra request during development; that is expected.

## API contract

### `GET /api/health`

```json
{ "status": "ok" }
```

### `GET /api/stays?destination=Monterey`

Returns `{ "stays": [...], "count": 2, "destinations": ["Monterey", "San Francisco", "Santa Cruz"] }`.

- No destination, an empty value, or whitespace: all six stays in featured order.
- Destination matching ignores case and surrounding whitespace.
- An unknown city: HTTP 200 with an empty `stays` array and count zero.
- Repeated destination values, values longer than 80 characters, or unsupported query parameters: HTTP 400 with `{ "error": "..." }`.
- Unknown API routes: JSON HTTP 404, never the React HTML page.
- No mutation endpoints. Changes are edits to the source files, not writes to a live database.

The tests cover the contract, all three city filters, stable featured order, empty results, invalid requests, and read-only behavior. They do not replace browser checks of the React UI.

The earlier dependency-free starter remains in Git history at commit `cd692ca`. No live deployment is configured; this GitHub repository is the source for a local demo.
