import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { MyListPanel } from "@components/features/list/MyListPanel";
import { useListStore } from "@/store/useListStore";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // ✅ Narrowed subscription — only the count, prevents unnecessary re-renders
  const listCount = useListStore((s) => s.count);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.theme = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#09090b] dark:bg-[#080808] dark:text-[#f4f4f5] font-sans selection:bg-brand/30 transition-colors duration-300">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#080808]/80 backdrop-blur-md border-b border-[#e4e4e7] dark:border-[#1f1f1f] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-shadow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#09090b] dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
              Cult<span className="text-[#a855f7]">Search</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#f4f4f5] border border-[#e4e4e7] dark:bg-[#111111] dark:border-[#1f1f1f] hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-colors text-zinc-600 dark:text-zinc-300"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <button
              onClick={() => { setIsDrawerOpen(true); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f4f4f5] dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#1f1f1f] hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-colors"
            >
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">My List</span>
              {listCount > 0 && (
                <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {listCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-4 py-8 animate-fade-in">
        {children}
      </main>
      
      <MyListPanel isOpen={isDrawerOpen} onClose={() => { setIsDrawerOpen(false); }} />
    </div>
  );
}
