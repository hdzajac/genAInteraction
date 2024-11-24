import { create } from 'zustand'

type Flags = {
  showAlternatives: string
}

type FeatureFlagState = {
  flags: Flags
  update: (flags: Flags) => void
}

export const useFlags = create<FeatureFlagState>((set) => ({
  flags: {
    showAlternatives: '2',
  },
  update: (flags: Flags) => {
    set((state) => ({
      flags,
    }))
  },
}))
