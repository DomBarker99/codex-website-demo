# Weekend Stay

A tiny, fictional hotel-listing website for a hands-on coding-agent demonstration. Clone it, ask your agent to explain the files, open it in a browser, and make one small change you can verify.

**No packages, build step, server, API keys, accounts, or internet connection are needed to run the downloaded website.** All data and decorative artwork are local. JavaScript must be enabled.

## Get it and open it

With Git:

```sh
git clone https://github.com/DomBarker99/codex-website-demo.git
cd codex-website-demo
```

Or, with an already-installed and authenticated GitHub CLI:

```sh
gh repo clone DomBarker99/codex-website-demo
cd codex-website-demo
```

Double-click `index.html` in your file manager. On macOS, the equivalent terminal command is:

```sh
open index.html
```

On Windows, double-click works too, or use `Start-Process .\index.html` from PowerShell. There is no `npm install` or `npm run dev` command for this project.

## What is here?

| File | Job |
| --- | --- |
| `index.html` | Page structure, destination control, and the reusable stay-card template |
| `styles.css` | Responsive layout, colors, and CSS-drawn scenery |
| `script.js` | Six fictional stays, destination filtering, and rendering |
| `AGENTS.md` | Project guidance for a coding agent; not a security boundary |

The starting site shows all six stays in a fixed, intentionally unsorted order. Destination filtering and reset already work. **Price sorting is deliberately not implemented**—it is the small feature to build during the demonstration.

## Start with understanding

After installing and signing into Codex CLI, start it from inside this repository:

```sh
codex
```

Example opening prompt:

> Read AGENTS.md and the project files. Before changing anything, explain what this website does, what each file is responsible for, and how to open it locally. Do not edit, install anything, or commit.

If an agent cloned this repository from a parent folder, exit that initial session, enter this directory, and start Codex here. A `cd` inside one shell tool call is not necessarily a change to the agent session's working directory or instruction scope.

## Suggested on-camera change

> Add a labeled price-sort dropdown with Featured, Price: low to high, and Price: high to low. Preserve destination filtering. Featured must restore the original order, and Reset filter must reset both controls. Keep the site dependency-free. Show the diff and explain how to verify it. Do not commit or push.

Check the actual browser, not only the agent's summary:

- Initial/Featured order: Harbor House, Redwood Hideaway, Sunset Loft, Cypress Cottage, North Beach Nook, Boardwalk Bungalow.
- Low-to-high prices: **$125, $145, $165, $185, $210, $240**. High-to-low is the reverse.
- Monterey has two stays: low-to-high should be Cypress Cottage ($165), then Harbor House ($185).
- Featured restores original order even after sorting. Sorting should not mutate the source data array.
- Reset restores all six stays in Featured order and resets both controls.
- Both controls have visible labels, work with the keyboard, and fit on a narrow screen.
- Reload after saving files. Inspect `git diff` and `git status` before deciding whether to commit.

The prompt above describes a future change; the starter repository does not already satisfy it.

## Verify the starter

1. Open `index.html`: six cards appear, with the prices $185, $125, $240, $165, $210, $145 in that order.
2. Choose each destination: two matching stays appear and the count changes to `2 stays`.
3. Select **Reset filter**: all six return in their original order.
4. Use Tab and the keyboard to reach and operate the dropdown and reset button.
5. Narrow the browser: the cards move from three columns to two, then one, without horizontal scrolling.

All names, descriptions, prices, and illustrations are fictional. This is a learning demo, not an actual booking service, travel recommendation, or payment application.
