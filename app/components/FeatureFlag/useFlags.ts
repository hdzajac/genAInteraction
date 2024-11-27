import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Flags = {
  showAlternatives: string
  usePatientData: boolean
}

type FeatureFlagState = {
  flags: Flags
  update: (flags: Flags) => void
}

export const useFlags = create<FeatureFlagState>()(
  persist(
    (set, get) => ({
      flags: {
        showAlternatives: '1',
        usePatientData: true,
      },
      update: (flags: Flags) => set({ flags }),
    }),
    {
      name: 'feature-flags', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    }
  )
)
