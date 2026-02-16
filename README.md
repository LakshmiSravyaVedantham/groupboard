<p align="center">
  <img src="https://img.shields.io/badge/GroupBoard-Collaborate_Together-FF6B35?style=for-the-badge&logoColor=white" alt="GroupBoard" />
</p>

<h1 align="center">GroupBoard</h1>

<p align="center">
  <strong>Beautiful collaborative boards that replace clunky Google Sheets for group coordination.</strong>
</p>

<p align="center">
  <a href="https://groupboard.vercel.app">Live Demo</a> &bull;
  <a href="#templates">Templates</a> &bull;
  <a href="#tech-stack">Tech Stack</a> &bull;
  <a href="#getting-started">Get Started</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel" alt="Vercel" />
</p>

---

## The Problem

Coordinating a potluck? Planning a group trip? Tracking RSVPs? You end up in a Google Sheet — zooming into tiny cells on your phone, accidentally editing someone else's row, writing `=SUM(D2:D47)` formulas for a simple headcount.

**GroupBoard fixes this.** One tap to claim an item. Beautiful cards instead of cells. Smart summaries instead of formulas. A 6-character share code instead of a Google account.

## Why GroupBoard > Google Sheets

| | Google Sheets | GroupBoard |
|---|---|---|
| **Claiming an item** | Find the right cell, type your name, hope nobody overwrites it | Tap "I'll bring this!" |
| **Mobile experience** | Pinch, zoom, scroll sideways, tap the wrong cell | Card-based UI with 44px tap targets |
| **Seeing progress** | Manually count filled rows or write formulas | Auto-updating progress ring & smart stats |
| **Sharing** | Share a long URL, require Google sign-in | 6-character code, no account needed |
| **Setup time** | Create sheet, format headers, set up dropdowns | Pick a template, name it, done |

## Templates

**Potluck** — Coordinate who brings what. Categories, serving sizes, dietary notes. See at a glance what's still needed.

**Event RSVP** — Track attendance with yes/no/maybe, plus-ones, and dietary needs. Auto-tallied headcount.

**Trip Planning** — Assign tasks, set budgets, track deadlines. Running total of trip costs.

**Shopping List** — Shared group shopping organized by store. Claim items so nothing gets bought twice.

**Custom Board** — Start blank, add your own columns. Make it anything you need.

Each template comes with its own **color theme** — warm oranges for potluck, cool violets for RSVPs, fresh teals for trips — with gradient headers, themed buttons, and matching status colors.

## Features

- **One-tap claiming** with satisfying visual feedback
- **Three view modes** — Compact List (dense sign-up sheet), Cards (visual), and Table (spreadsheet-like)
- **Inline editing** — click any field to edit it right where it lives
- **Smart summaries** — progress ring, claimed/available counts, category breakdowns
- **Needs bar** — see unclaimed items grouped by category at a glance
- **Real-time collaboration** — auto-polls every 5 seconds, no refresh needed
- **Mobile-first** — bottom sheets, large touch targets, responsive layouts
- **Share via code** — 6-character alphanumeric codes for easy sharing
- **Participant avatars** — pick a color, see who claimed what
- **Auto-join on claim** — tap claim when you haven't joined yet and the join dialog pops up automatically
- **Toast notifications** — feedback on every action
- **No account required** — just a name and a color

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 7 |
| **Styling** | Tailwind CSS 4, custom theme system |
| **Routing** | Wouter |
| **Data Fetching** | TanStack React Query (5s polling) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Express 5, TypeScript |
| **Validation** | Zod 4 |
| **Storage** | In-memory (MemStorage) |
| **Deployment** | Vercel (static + serverless) |

## Project Structure

```
groupboard/
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   └── groupboard/  # 14 UI components
│       ├── hooks/           # React Query + participant hooks
│       ├── lib/             # API client, themes, utils
│       └── pages/           # 4 route pages
├── server/                  # Express backend
│   ├── index.ts             # Server entry
│   ├── routes.ts            # 8 API endpoints
│   └── storage.ts           # In-memory storage
├── shared/                  # Shared between client & server
│   ├── schema.ts            # Zod schemas & types
│   └── templates.ts         # 5 template definitions
├── api/                     # Vercel serverless function
│   └── index.ts
└── vercel.json              # Deployment config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
# Clone the repo
git clone https://github.com/sravyalu/groupboard.git
cd groupboard

# Install dependencies
npm install

# Start dev server (frontend + backend)
npm run dev
```

Frontend runs on `http://localhost:5173` with API proxy to `http://localhost:3001`.

### Build

```bash
npm run build
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/boards` | Create a new board |
| `GET` | `/api/boards/:shareCode` | Get board with items & participants |
| `PUT` | `/api/boards/:id` | Update board settings |
| `POST` | `/api/boards/:id/items` | Add an item |
| `PUT` | `/api/boards/:id/items/:itemId` | Update or claim an item |
| `DELETE` | `/api/boards/:id/items/:itemId` | Delete an item |
| `PUT` | `/api/boards/:id/items/reorder` | Reorder items |
| `POST` | `/api/boards/:id/participants` | Join a board |

## License

MIT

---

<p align="center">
  Built with care to make group coordination delightful.
</p>
