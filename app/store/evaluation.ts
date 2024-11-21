import { create } from 'zustand'

import { EvaluationReport } from './types'

type EvaluationState = {
  evaluation: EvaluationReport
  updateEvaluation(evaluation: EvaluationReport): void
}

const defaultValues = {
  diagnosis: '',
  treatment: '',
  visualFeatures: '',
  alternativePlan: '',
  followUp: '',
}

export const useEvaluationStore = create<EvaluationState>((set) => ({
  evaluation: defaultValues,
  updateEvaluation(updatedValues) {
    set((state) => ({
      evaluation: {
        ...state.evaluation,
        ...updatedValues,
      },
    }))
  },
}))
