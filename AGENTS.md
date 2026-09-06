# Project guidance

## Understand before editing

- This is one npm package with a React/Vite frontend and a Node.js/Express API, using JavaScript and ES modules. It is not a multi-package workspace.
- Read `README.md`, `package.json`, and relevant source files before changing anything.
- `src/client/` owns React components, browser fetching, and CSS. `src/server/` owns request validation, filtering, and fictional fixture data. `test/` contains real HTTP API tests using Node's built-in test runner.
- Read the fixture data through the API in browser code; do not import server data into React.
- Explain commands and respect harness approval/sandbox settings. This file provides guidance, not permissions or guaranteed enforcement.

## Bound the work

- Work only in this repository. Do not inspect or modify unrelated folders.
- Complete the requested task without unrelated refactoring, a redesign, or extra architecture.
- Preserve destination filtering, reset, responsive layout, visible labels, keyboard access, and loading/empty/error states.
- Preserve the fixture array's original featured order. When implementing sorting, sort a derived copy rather than mutating the source array.
- Add tests for new API behavior and invalid input. Keep existing behavior covered.
- Do not add databases, authentication, payments, external assets/services, trackers, or dependencies unless explicitly requested.
- Do not edit `AGENTS.md` unless specifically asked.
- Do not commit, push, publish, or open a PR unless explicitly asked.
- Never add credentials, session data, personal files, or actual student/course information.

## Run and verify

- Requires Node.js 22.12+ and npm. Install with `npm install`; the committed lockfile supports reproducible installs.
- `npm run dev`: Express API on 127.0.0.1:3001 and Vite frontend on 127.0.0.1:5173. Open the Vite URL, not `index.html` directly. Ctrl+C stops both.
- `npm test`: HTTP API checks on a temporary port; no dev server needed. `npm run build`: compile React. `npm start`: serve the completed build and API together on port 3001.
- Check the actual browser: six stays, each destination, reset, keyboard operation, narrow viewport, and the requested feature. Confirm errors can recover via Try again.
- After edits, run tests and build, inspect `git diff`/`git status`, and explain changed files and verification results. Report unperformed checks honestly.
