import { create } from 'zustand'

import { EvaluationReport } from './types'

type EvaluationState = {
  evaluation: EvaluationReport
  init: (evaluation: EvaluationReport) => void
  updateEvaluation(evaluation: EvaluationState): void
}

const defaultValues = {
  diagnosis: 'Alm venus',
  treatment: 'Obs.',
  imageQuality: 'Good',
  visualFeatures: 'Uniform colour, sharp border, size < 6 mm',
  educationalComments: 'Observation, sunscreen',
}

export const useEvaluationStore = create<EvaluationState>((set) => ({
  evaluation: defaultValues,
  init(evaluation) {
    set({ evaluation })
  },
  updateEvaluation(updatedValues) {
    set((state) => ({
      evaluation: {
        ...state.evaluation,
        ...updatedValues,
      },
    }))
  },
}))
