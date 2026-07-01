import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { SelectedProfile } from '../types/influencer'

interface ListState {
  selectedProfiles: SelectedProfile[]
  addProfile: (profile: SelectedProfile) => 'added' | 'duplicate'
  removeProfile: (username: string) => void
  clearAll: () => void
  isSelected: (username: string) => boolean
  count: number
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile) => {
        const already = get().selectedProfiles.find(
          (p) => p.username === profile.username
        )
        if (already) return 'duplicate' // already exists
        
        set((state) => ({
          selectedProfiles: [
            ...state.selectedProfiles,
            { ...profile, addedAt: Date.now() },
          ],
        }))
        return 'added'
      },

      removeProfile: (username) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.username !== username
          ),
        })),

      clearAll: () => set({ selectedProfiles: [] }),

      isSelected: (username) =>
        get().selectedProfiles.some((p) => p.username === username),

      get count() {
        return get().selectedProfiles.length
      },
    }),
    {
      name: 'wobb-selected-profiles', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)
