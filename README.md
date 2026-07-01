# High-Performance Influencer Search Platform

A production-grade, highly optimized React application for finding and curating social media influencers across multiple platforms (Instagram, TikTok, YouTube). 

## 🚀 Key Features & Architectural Upgrades

### 1. Robust State Management (Zustand)
Replaced React Context with Zustand to enable atomic state updates and granular component subscriptions.
- **`useSearchStore`**: Manages the global search query and platform filters. Components subscribe only to the slices they need, eliminating cascading re-renders.
- **`useListStore`**: Manages the "My List" collection. Includes local storage persistence, duplicate prevention, and O(1) lookups via a map-like structure for the `isSelected` check.

### 2. Extreme Performance Optimization
- **Stable References**: Extracted static objects, config arrays, and filter logic outside of component bodies to ensure stable references across renders.
- **Component Memoization**: Core UI elements (`CreatorCard`, `CreatorGrid`, `PlatformFilter`, `ListItem`) are wrapped in `React.memo` with custom prop equality where needed.
- **Custom Hooks**: 
  - `useFilteredCreators`: Memoizes the heavy search/filter logic.
  - `useDebounce`: Delays search execution by 300ms to prevent rapid, unnecessary store updates while typing.
- **Lazy Loading & Code Splitting**: Route-level lazy loading separates `Dashboard` and `Profile` chunks, wrapped in a `Suspense` boundary.
- **Image Optimization**: Implemented a custom `Avatar` component using `IntersectionObserver` for lazy-loading images only when they approach the viewport, complete with fallback skeletons to prevent Cumulative Layout Shift (CLS).
- **Data Preloading**: Added a fire-and-forget `preloadProfile` action that caches influencer JSON data the moment a user hovers over a Creator Card, making the subsequent navigation feel instant.

### 3. UI/UX Polish
- **Dynamic Micro-Interactions**: Hover states with gradient blobs, spring-like layout transitions, and interactive visual feedback for all buttons.
- **Page Transitions**: Smooth fade-ins utilizing `requestAnimationFrame` for seamless route changes without jarring flash-of-unstyled-content (FOUC).
- **Toast Notifications**: Built a robust, non-blocking toast system for giving immediate feedback on list actions.
- **Empty States**: Beautifully crafted empty states for both search and the My List panel.

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 8 (Rolldown)
- **Styling**: Tailwind CSS v4 + lucide-react for iconography
- **State**: Zustand
- **Routing**: React Router DOM v7

## 📦 Local Development

### Prerequisites
- Node.js >= 18.x

### Setup Workflow
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173`

3. **Type Checking & Linting (Strict Mode):**
   ```bash
   npm run lint
   npx tsc --noEmit
   ```

4. **Production Build & Analysis:**
   ```bash
   npm run build
   ```
   *Note: This generates a `dist/bundle-stats.html` file using `rollup-plugin-visualizer` so you can visually inspect chunk sizes.*

## 🏗️ Folder Structure
```
src/
├── assets/         # Static JSON mock data
├── components/     # Reusable UI building blocks
│   ├── features/   # Domain-specific components (dashboard, list)
│   ├── layout/     # Structural components (PageWrapper)
│   └── ui/         # Primitives (Avatar, Button, Input, Toast)
├── hooks/          # Custom React hooks (useDebounce, useFilteredCreators)
├── lib/            # Utilities and data formatting
├── pages/          # Route-level components
├── store/          # Zustand global state stores
└── types/          # TypeScript interfaces
```
