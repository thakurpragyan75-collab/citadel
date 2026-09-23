# Citadel

Local sovereignty agent. Pure code. No cloud brain.

Exposure map, tap analysis, anomaly watch, consent beacon, tracking tax, panic switch. Every action writes a SHA-256 receipt on this device.

This is **your** browser as the castle. It is not a kit to watch someone else. There is no stealth mode, no remote install, no hidden location.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Commands

| Command | Route | What it does |
|---|---|---|
| `exposure` | `/leak` | Scores how joinable *you* are from identifiers + this browser fingerprint |
| `tap` | `/tap` | Matches hosts against a packed tracker list vs a privacy claim |
| `watch` | `/watch` | Samples *this* browser: battery, hidden tab, downlink, heap |
| `beacon` | `/beacon` | Consented household location on this device only. Every look is a receipt |
| `tax` | `/tax` | Cuts client entropy. Makes following you expensive |
| `panic` | `/panic` | Wipes identity, stops watch, revokes grants, freezes modules |
| `ledger` | `/ledger` | Hash-chained receipts. Verify integrity |

## Stack

React 19 + Vite + TypeScript + Tailwind v4 + Zustand. Rules engines live in `src/lib/engine/`.

## Law of the house

You are the only admin. Beacon cannot see anyone who did not grant you. Panic is loud on purpose.
