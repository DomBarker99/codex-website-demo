# Project guidance

## Understand before editing

- This repository is a small, static website: HTML, CSS, and plain JavaScript.
- Read `README.md` and the relevant files before proposing changes.
- The six stays in `script.js` are fictional local data. There is no backend or booking system.
- Explain commands and request approval when the active harness permissions require it. These instructions do not grant permissions or replace sandbox controls.

## Bound the work

- Work only in this repository. Do not inspect or modify unrelated folders.
- Complete the requested task without unrelated cleanup or a redesign.
- Keep the website dependency-free. Do not add frameworks, package managers, external assets, trackers, or API calls unless explicitly requested.
- Preserve the destination filter, reset behavior, responsive layout, visible control labels, and keyboard access.
- Keep the original stay order available; do not mutate the source `stays` array when adding sorting.
- Do not edit `AGENTS.md` unless specifically asked.
- Do not commit, push, publish, or open a pull request unless explicitly asked.
- Never add credentials, session data, personal files, or real student/course information.

## Run and verify

- Open `index.html` directly in a browser; on macOS use `open index.html`. No installation or build command is needed.
- Refresh the page after editing. Check all six stays, each destination, reset, keyboard operation, and a narrow viewport.
- For a new feature, check its expected result in the browser and verify existing behavior still works.
- If you cannot perform a browser check, state that clearly and provide the exact manual check. Do not report unperformed tests as passed.
- After editing, explain the changed files, show or summarize `git diff`, and report checks performed plus any remaining limitations.
