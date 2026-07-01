<div align="center">

# 🔍 CultSearch

**A high-performance influencer discovery & curation platform**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Search, discover, and curate top creators across Instagram, YouTube, and TikTok — with production-grade performance optimization baked in from day one.

[Live Demo](#) · [Report Bug](https://github.com/Hksona123/CultSearch/issues) · [Request Feature](https://github.com/Hksona123/CultSearch/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Smart Search** | Debounced, real-time filtering across all creators |
| 📱 **Multi-Platform** | Browse Instagram, YouTube & TikTok in one place |
| 📋 **My List** | Save and manage a curated list of creators |
| 👤 **Creator Profiles** | Detailed stats: followers, engagement, avg. likes/comments/views |
| ⚡ **Lazy Loading** | Images and routes loaded only when needed |
| 🎨 **Dark / Light Mode** | Full theme support via `prefers-color-scheme` |
| 💾 **Persistent State** | Your list survives page refresh via localStorage |
| 📦 **Optimized Bundle** | Code-split chunks under 250kb, visualized with Rollup Visualizer |

---

## 🛠️ Tech Stack

```
React 19 + TypeScript 6 (strict mode)
Vite 8 (Rolldown bundler)
Tailwind CSS v4 (via @tailwindcss/vite plugin)
Zustand 5 (global state management)
React Router DOM v7 (client-side routing)
Lucide React (iconography)
react-intersection-observer (lazy image loading)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Hksona123/CultSearch.git
cd CultSearch

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📜 Available Scripts

```bash
npm run dev        # Start local dev server with HMR
npm run build      # Production build (TypeScript check + Vite bundle)
npm run preview    # Preview the production build locally
npm run lint       # ESLint with strict TypeScript rules
```

---

## 🏗️ Project Structure

```
src/
├── assets/
│   └── data/
│       ├── search/          # Platform creator index JSONs
│       └── profiles/        # Full creator profile JSONs
│
├── components/
│   ├── features/
│   │   ├── dashboard/       # CreatorCard, CreatorGrid, SearchBar, PlatformFilter
│   │   └── list/            # MyListPanel, ListItem, AddToListButton
│   ├── layout/              # PageWrapper (header + nav + panel)
│   └── ui/                  # Avatar, Button, Input, Toast, Skeleton, Badge...
│
├── hooks/
│   ├── useDebounce.ts       # Delays search store updates by 300ms
│   ├── useFilteredCreators.ts  # Memoized filter + sort logic
│   ├── useLocalStorage.ts   # Typed localStorage persistence hook
│   └── useToast.ts          # Non-blocking toast notification hook
│
├── lib/
│   ├── constants.ts         # Platform config, debounce timing
│   ├── data.ts              # JSON loader, module-level cache, preloadProfile()
│   ├── performance.ts       # Dev-only render timing util
│   └── utils.ts             # formatFollowers, formatEngagement, cn()
│
├── pages/
│   ├── Dashboard.tsx        # Main search + grid view
│   └── Profile.tsx          # Creator detail page
│
├── store/
│   ├── useSearchStore.ts    # query + platform filter state
│   └── useListStore.ts      # selected profiles + localStorage persistence
│
└── types/
    ├── influencer.ts        # Influencer, InfluencerProfile, SelectedProfile
    ├── component.ts         # ButtonVariant, ButtonSize, etc.
    └── store.ts             # SearchState, ListState interfaces
```

---

## ⚡ Performance Architecture

### Memoization Strategy
- **`React.memo`** on `CreatorCard`, `CreatorGrid`, `PlatformFilter`, `ListItem`, `MyListPanel`
- **`useCallback`** on every event handler — zero unstable references passed as props
- **`useMemo`** inside `useFilteredCreators` — filters & sorts run only when query/platform changes
- Static config arrays (`PLATFORMS`, `platformColors`) defined at module scope — never recreated

### Data Loading
- `getAllCreators()` result cached at module level — parsed once, never re-parsed
- `profileCache` Map — profile JSON files cached after first load
- `preloadProfile(username)` — fires on card `mouseenter`, so profile data is ready before navigation
- `import.meta.glob` for dynamic profile imports — each profile is a separate async chunk

### Code Splitting
| Chunk | Contents | Gzipped |
|---|---|---|
| `react-vendor` | react, react-dom, react-router | ~74 kB |
| `ui-vendor` | lucide-react, clsx, tailwind-merge | ~10 kB |
| `zustand-vendor` | zustand | ~1.3 kB |
| `Dashboard` | Dashboard page + components | ~2.5 kB |
| `Profile` | Profile page | ~2.6 kB |

### Image Optimization
- Custom `Avatar` component uses **`IntersectionObserver`** — images load 100px before viewport
- Explicit size classes on every avatar → **zero Cumulative Layout Shift (CLS)**
- `loading="lazy" decoding="async"` on every `<img>`
- Animated pulse placeholder shown until image loads

---

## 🗂️ State Management (Zustand)

### `useSearchStore`
```ts
{ query, platform }       // Current search state
{ setQuery, setPlatform } // Actions
```
Components subscribe with **narrowed selectors** — `useSearchStore(s => s.query)` — so they only re-render when their specific slice changes.

### `useListStore`
```ts
{ selectedProfiles }                     // Creator list (persisted to localStorage)
{ addProfile, removeProfile, clearAll }  // Mutations
{ isSelected }                           // O(1) lookup by username
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import `CultSearch`
3. Vercel auto-detects Vite — default settings work perfectly:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy** — live on a global CDN in ~60 seconds ✅

### Deploy to Netlify
1. [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Add a `_redirects` file in `/public` for SPA routing:
   ```
   /*  /index.html  200
   ```

### Manual (Any Static Host)
```bash
npm run build   # outputs to /dist
# Upload contents of /dist to your host
```
> ⚠️ Configure your host to redirect all 404s to `index.html` so React Router handles client-side navigation correctly.

---

## 🐛 Errors Fixed & How

This section documents every significant error found during the audit phase and precisely how each was resolved.

### 1. Tailwind CSS Not Rendering (No Styles at All)
**Root Cause:** `@tailwindcss/vite` plugin was missing from `vite.config.ts`. Tailwind CSS v4 requires its own Vite plugin to process the `@import "tailwindcss"` directive. Without it, the CSS file is treated as plain CSS and all utility classes are stripped.

**Fix:** Added `tailwindcss()` to the `plugins` array in `vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss(), visualizer()]
```

---

### 2. `tsconfig.json` IDE Errors (Red Underlines)
**Root Cause:** We had overridden the standard Vite 8 `tsconfig.json` with a monolithic config. Vite 8 uses a **project references** pattern — a root `tsconfig.json` that simply delegates to `tsconfig.app.json` and `tsconfig.node.json`. Merging them caused the TypeScript Language Server to report conflicts.

**Fix:** Restored `tsconfig.json` to the correct reference-only format and moved all path aliases + strict checks into `tsconfig.app.json`:
```json
// tsconfig.json — root (Vite 8 standard)
{ "files": [], "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }] }
```

---

### 3. `manualChunks` Build Error (Rolldown)
**Root Cause:** We had defined `manualChunks` as a plain **object** (`{ 'react-vendor': ['react', ...] }`). Vite 8 uses **Rolldown** as its bundler, which requires `manualChunks` to be a **function**.

**Fix:**
```ts
// ❌ Old — object syntax (Rollup only)
manualChunks: { 'react-vendor': ['react', 'react-dom'] }

// ✅ Fixed — function syntax (Rolldown compatible)
manualChunks(id: string) {
  if (id.includes('node_modules/react/')) return 'react-vendor'
  return undefined
}
```

---

### 4. `process.env` Not Defined (TypeScript Error)
**Root Cause:** `src/lib/performance.ts` used `process.env.NODE_ENV` which is a Node.js global — it doesn't exist in a browser/Vite context without `@types/node`.

**Fix:** Replaced with Vite's built-in environment variable:
```ts
// ❌ process.env.NODE_ENV  (Node.js only)
// ✅ import.meta.env.MODE  (Vite browser-safe)
if (import.meta.env.MODE !== 'development') return
```

---

### 5. Non-Null Assertion `!` (ESLint Strict)
**Root Cause:** The profile cache lookup used `profileCache.get(username)!` to bypass TypeScript's `undefined` possibility. ESLint's `@typescript-eslint/no-non-null-assertion` rule flags this.

**Fix:** Replaced assertion with a proper conditional:
```ts
// ❌ return profileCache.get(username)!
// ✅
const cached = profileCache.get(username)
if (cached) return cached
```

---

### 6. Floating Promises (ESLint Strict)
**Root Cause:** Calls like `navigate('/path')` and `loadProfileByUsername(username).then(...)` return Promises that were not being handled. ESLint's `@typescript-eslint/no-floating-promises` treats this as a potential silent failure.

**Fix:** Explicitly marked fire-and-forget calls with `void`:
```ts
void navigate('/profile/' + username)
void loadProfileByUsername(username).then(setProfileData)
```

---

### 7. Template Literal Type Errors (ESLint Strict)
**Root Cause:** `@typescript-eslint/restrict-template-expressions` disallows embedding raw `number` values inside template literals by default. E.g. `` `${filtered.length} results` `` was flagged.

**Fix:** Converted numbers to strings explicitly:
```ts
// ❌ `${filtered.length} results`
// ✅
`${filtered.length.toString()} results`
// or for animation delays:
style={{ animationDelay: `${(index * 50).toString()}ms` }}
```

---

### 8. Duplicate React Imports (ESLint)
**Root Cause:** Older component files had two separate React import lines — one for the default and one for named types — which violated the `no-duplicate-imports` rule.

**Fix:** Merged into a single import:
```ts
// ❌
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

// ✅
import { forwardRef, type ButtonHTMLAttributes } from 'react'
```

---

### 9. Unnecessary Conditionals (ESLint Strict)
**Root Cause:** Some components checked `if (!config) return null` for objects typed as `Record<Platform, ...>` — TypeScript's exhaustive typing means this branch can never be taken, and the linter flags it as dead code.

**Fix:** Removed unreachable null guards and trusted the type system:
```ts
// ❌ const config = platformConfig[platform]; if (!config) return null
// ✅ const config = platformConfig[platform]  // always defined
```

---

### 10. `.gitignore` Was Fully Commented Out
**Root Cause:** Every line in `.gitignore` was prefixed with `#`, meaning `node_modules/`, `dist/`, and `.env` files would all have been committed to GitHub.

**Fix:** Restored the proper ignore rules and also excluded temp/scratch files (`fix-imports.mjs`, `error.md`).

---

## 🔄 Complete Project Workflow

```
User opens the app
        │
        ▼
┌─────────────────────────────┐
│         App.tsx             │  ← Lazy loads Dashboard + Profile via React.lazy()
│  BrowserRouter + Suspense   │  ← PageLoader shown while chunk downloads
└─────────────┬───────────────┘
              │
    Route: "/" │
              ▼
┌─────────────────────────────────────────────────┐
│                  Dashboard.tsx                  │
│                                                 │
│  getAllCreators() ──► module-level cache         │
│  (reads instagram.json + youtube.json +         │
│   tiktok.json, parses once, never again)        │
│                                                 │
│  useFilteredCreators(allCreators)               │
│    └── reads useSearchStore (query + platform)  │
│    └── returns memoized filtered + total        │
│                                                 │
│  ┌────────────────────────────────────────┐     │
│  │            PlatformFilter              │     │
│  │  Reads/writes useSearchStore directly  │     │
│  │  [All] [Instagram] [YouTube] [TikTok]  │     │
│  │                   +                    │     │
│  │  SearchBar ──► useDebounce(300ms)      │     │
│  │             ──► setQuery() on Zustand  │     │
│  └────────────────────────────────────────┘     │
│                      │                          │
│                       ▼                          │
│  ┌─────────────────────────────────────────┐    │
│  │               CreatorGrid               │    │
│  │  Maps filtered[] → <CreatorCard />      │    │
│  │  key={profile.username} (stable)        │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
              │
    Hover on card
              │
              ▼
     preloadProfile(username)
       └── fires loadProfileByUsername() in bg
       └── result stored in profileCache Map
       └── navigation feels instant

    Click card / "View Profile"
              │
              ▼
┌──────────────────────────────────────────┐
│              Profile.tsx                 │
│                                          │
│  loadProfileByUsername(username)         │
│    └── checks profileCache first         │
│    └── hits JSON module if miss          │
│    └── renders Avatar, stats, metrics    │
└──────────────────────────────────────────┘

    Click "Add to List" on any card
              │
              ▼
┌──────────────────────────────────────────┐
│          AddToListButton                 │
│                                          │
│  useListStore.addProfile(profile)        │
│    ├── checks for duplicate              │
│    ├── pushes to selectedProfiles[]      │
│    └── Zustand middleware persists       │
│        to localStorage automatically     │
│                                          │
│  Toast notification shown (success /     │
│  warning for duplicates)                 │
└──────────────────────────────────────────┘
              │
    Click "My List" in header
              │
              ▼
┌──────────────────────────────────────────┐
│             MyListPanel                  │
│  Slides in from right (CSS transform)   │
│  useSortedProfiles() ──► memoized sort  │
│  ListItem per profile (lazy Avatar)     │
│  Remove button → removeProfile()        │
│  Escape key / backdrop click → close    │
└──────────────────────────────────────────┘
```

---

## 📄 License

MIT © [Hksona123](https://github.com/Hksona123)
