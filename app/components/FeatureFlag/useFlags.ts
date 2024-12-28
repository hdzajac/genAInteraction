import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Flags = {
  // Prompt
  usePatientData: boolean
  includeExamplesInPrompts: boolean
  // UI
  showAlternatives: string
  streamData: boolean
}

type FeatureFlagState = {
  flags: Flags
  update: (flags: Flags) => void
}

export const useFlags = create<FeatureFlagState>()(
  persist(
    (set, get) => ({
      flags: {
        // Prompt
        usePatientData: true,
        includeExamplesInPrompts: false,
        // UI
        showAlternatives: '1',
        streamData: false,
      },
      update: (flags: Flags) => set({ flags }),
    }),
    {
      name: 'feature-flags', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    }
  )
)
