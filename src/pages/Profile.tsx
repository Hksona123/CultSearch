import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PageWrapper as Layout } from "@components/layout/PageWrapper";
import { Badge as VerifiedBadge } from "@components/ui/Badge";
import { Avatar } from "@components/ui/Avatar";
import type { InfluencerProfile, Platform } from "@types";
import { formatEngagement } from "@lib/utils";
import { loadProfileByUsername } from "@lib/data";
import { useListStore } from "@/store/useListStore";
import { AddToListButton } from "@/components/features/list/AddToListButton";

function formatFollowers(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

const platformColors: Record<string, string> = {
  instagram: "from-pink-500 to-rose-500",
  youtube: "from-red-500 to-red-600",
  tiktok: "from-cyan-400 to-blue-500",
  unknown: "from-gray-500 to-gray-600",
};

export function Profile() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  // ✅ Narrowed subscriptions
  const isSelected = useListStore((s) => s.isSelected);
  const isSaved = username ? isSelected(username) : false;
  const [profileData, setProfileData] = useState<InfluencerProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;

    void loadProfileByUsername(username).then((data: InfluencerProfile | null) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Invalid profile</p>
          <Link to="/" className="btn-secondary">Back to search</Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 animate-pulse">Loading creator profile...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 max-w-md mx-auto text-center glass-card p-8 mt-10">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" className="mb-4">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[#09090b] dark:text-zinc-300 text-lg mb-2 font-medium">Profile Not Found</p>
          <p className="text-zinc-500 mb-6 text-sm">
            Could not load profile details for @{username}. They might have changed their handle or deactivated their account.
          </p>
          <Link to="/" className="btn-secondary w-full">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: InfluencerProfile = profileData;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#09090b] dark:hover:text-zinc-300 transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to search
        </Link>

        {/* Hero Section */}
        <div className="glass-card p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7c3aed]/20 dark:from-[#7c3aed]/10 to-transparent blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            <div className="relative">
              <Avatar
                src={user.avatar}
                alt={user.username}
                name={user.fullName}
                size="xl"
                ringColor="ring-white dark:ring-[#111111]"
                className="border border-[#e4e4e7] dark:border-[#2a2a2a] shadow-xl"
              />
              <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full bg-gradient-to-r ${platformColors[platform] || platformColors.unknown || ''} shadow-lg whitespace-nowrap border border-white dark:border-[#111111]`}>
                {platform}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-[#09090b] dark:text-white tracking-tight">{user.fullName}</h1>
                <VerifiedBadge verified={user.verified} />
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 text-lg mb-4">@{user.username}</div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-[#09090b] dark:text-white tracking-tight">{formatFollowers(user.followers)}</span>
                  <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Followers</span>
                </div>
                
                <div className="w-1 h-1 rounded-full bg-[#e4e4e7] dark:bg-zinc-700 hidden sm:block"></div>
                
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[#06b6d4] hover:text-[#08c8e8] transition-colors bg-[#06b6d4]/10 px-3 py-1.5 rounded-lg"
                  >
                    View on platform
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col items-center md:items-end gap-2">
              <AddToListButton
                profile={{
                  ...user,
                  platform: platform as Platform,
                  addedAt: 0
                }}
                size="lg"
                className="w-full"
              />
              {isSaved && (
                <p className="text-emerald-500 text-xs font-medium dark:text-emerald-400">
                  ✓ Saved to your list
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Bio Section */}
          <div className="md:col-span-2 glass-card p-6 h-full flex flex-col">
            <h3 className="text-sm font-semibold text-[#09090b] dark:text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              About
            </h3>
            {user.bio ? (
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap flex-1">{user.bio}</p>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-600 italic flex-1">No bio provided.</p>
            )}
          </div>

          {/* Quick Stats Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#f4f4f5] dark:bg-[#151515] border border-[#e4e4e7] dark:border-[#1f1f1f] rounded-xl p-5 flex flex-col justify-center items-center text-center">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Engagement Rate</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">
                {user.engagementRate ? formatEngagement(user.engagementRate) : "N/A"}
              </span>
            </div>
            <div className="bg-[#f4f4f5] dark:bg-[#151515] border border-[#e4e4e7] dark:border-[#1f1f1f] rounded-xl p-5 flex flex-col justify-center items-center text-center">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Total Engagements</span>
              <span className="text-2xl font-bold text-[#09090b] dark:text-zinc-200">
                {user.metrics?.impressions !== undefined ? formatFollowers(user.metrics.impressions) : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-[#09090b] dark:text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
            </svg>
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.posts > 0 && (
              <div className="bg-white dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#1f1f1f] hover:border-[#7c3aed] dark:hover:border-[#2a2a2a] transition-colors rounded-xl p-5 shadow-sm dark:shadow-none">
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Posts</div>
                <div className="text-xl font-semibold text-[#09090b] dark:text-zinc-200">{user.posts.toLocaleString()}</div>
              </div>
            )}
            
            {user.metrics?.avgLikes !== undefined && (
              <div className="bg-white dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#1f1f1f] hover:border-[#7c3aed] dark:hover:border-[#2a2a2a] transition-colors rounded-xl p-5 shadow-sm dark:shadow-none">
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Avg Likes</div>
                <div className="text-xl font-semibold text-[#09090b] dark:text-zinc-200">{formatFollowers(user.metrics?.avgLikes || 0)}</div>
              </div>
            )}
            
            {user.metrics?.avgComments !== undefined && (
              <div className="bg-white dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#1f1f1f] hover:border-[#7c3aed] dark:hover:border-[#2a2a2a] transition-colors rounded-xl p-5 shadow-sm dark:shadow-none">
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Avg Comments</div>
                <div className="text-xl font-semibold text-[#09090b] dark:text-zinc-200">{formatFollowers(user.metrics?.avgComments || 0)}</div>
              </div>
            )}
            
            {user.metrics?.avgViews !== undefined && user.metrics?.avgViews > 0 && (
              <div className="bg-white dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#1f1f1f] hover:border-[#7c3aed] dark:hover:border-[#2a2a2a] transition-colors rounded-xl p-5 shadow-sm dark:shadow-none">
                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Avg Views</div>
                <div className="text-xl font-semibold text-[#09090b] dark:text-zinc-200">{formatFollowers(user.metrics?.avgViews)}</div>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
