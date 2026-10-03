# Vault Counter

A cash counting tool originally built to help coworkers count a store's back office vault and transfer the denomination breakdown to a company spreadsheet. The refreshed version keeps that workflow and adds configurable bundle sizes for stores that package bills differently.

## Run locally

Use Node.js 22 or newer. The project has no runtime dependencies and requires no install step for local counting. Install development dependencies with `npm ci` when using Wrangler for deployment.

```sh
npm start
```

Open http://localhost:5187. Choose another port with `PORT=5190 npm start`. The development server binds to all interfaces so the app can be previewed from a paired device. Run it on a trusted network.

Alternatively, serve the project with any static HTTP server. JavaScript modules require HTTP rather than opening `index.html` directly.

## Use the counter

1. Enter the number of sealed coin rolls, boxes, loose bills, and bill bundles. Empty quantities count as zero.
2. Expand **Store settings** and enter the number of bills per bundle for $1, $5, and $10 denominations. Click **Apply bundle sizes** to recalculate the current count.
3. Optionally enter expected cash to see whether the count balances, is short, or is over.
4. Export a CSV with each quantity, package value, subtotal, grand total, and optional target comparison.

Counts and applied settings save automatically in the current browser. **Clear count** resets quantities and the target while preserving store settings. **Undo clear** restores the previous count until another edit. **Try a sample count** loads labeled demonstration quantities into an empty count and uses your current bundle settings.

The original defaults are 100 bills per $1 bundle, 100 bills per $5 bundle, and 10 bills per $10 bundle. These reflect the original workplace convention, not a universal banking rule.

| Coin | Roll value | Box value |
| --- | ---: | ---: |
| Pennies | $0.50 | $25.00 |
| Nickels | $2.00 | $100.00 |
| Dimes | $5.00 | $250.00 |
| Quarters | $10.00 | $500.00 |

## Implementation

- Semantic HTML and responsive CSS retain the green coin, blue small bill, and red large bill groups.
- `blocks/money.js` defines denomination rules and pure calculations using integer cents. A single data model drives inputs, totals, settings, and CSV output.
- `blocks/app.js` manages input validation, rendering, browser persistence, and user actions.
- `scripts/serve.js` is a small dependency free development server that blocks hidden files and directory traversal.
- `tests/money.test.js` checks packaging values, mixed totals, invalid quantities, target precision, and custom bundle sizes with Node's built-in test runner.

```sh
npm test
```

Counts must be whole numbers between zero and 1,000,000. Bundle sizes must be whole numbers between one and 1,000,000. Invalid quantities show inline errors and block export rather than producing an incomplete total. The UI uses labeled inputs, keyboard focus indicators, and live total announcements. A mobile total bar keeps the running total visible while counting.

## Hosting

The app is static and includes `wrangler.jsonc` for Cloudflare Workers Static Assets. No backend Worker code is needed. The build copies only `index.html`, `pages/`, `blocks/`, and `images/` into `dist/`. Asset paths are relative, including for project subdirectory hosting.

For a Cloudflare hosting bot or Workers Builds, use:

- Install command: `npm ci`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Worker name: `vault-counter-v2`
- Asset directory: `dist`

The bot must provide its Cloudflare credentials. No credentials are stored in this repository. Wrangler also runs the configured build command for direct CLI deployments. After installing development dependencies, `npm run deploy` is an equivalent deploy command.

Validate the deployment package without publishing:

```sh
npm ci
npm test
npx wrangler deploy --dry-run
```

The generated `dist/` directory can also be published to another static host. `dist/` and Wrangler's local state are ignored by Git.

The repository retains its historical `CNAME` file. Confirm that the custom domain is still yours and configured correctly before enabling it on a new deployment. The old live URL has not been verified as part of this refresh.

## Scope

Store settings are local configuration controls. They do not provide authenticated administrator roles, a shared store database, multi-device synchronization, or an audit history. Browser storage belongs to this browser and origin; clearing site data removes it. Export a CSV when you need a portable record. If storage is blocked, calculation and export continue to work.

## Portfolio context

This project began as a practical tool for coworkers. The refresh replaces repetitive denomination handlers with a shared model, fixes delayed updates and fractional quantity handling, and makes packaging rules configurable. It provides a concrete example of improving an existing product through domain modeling, input validation, accessible UI, and automated calculation tests.
