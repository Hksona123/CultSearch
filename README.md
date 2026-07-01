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

## 📄 License

MIT © [Hksona123](https://github.com/Hksona123)
