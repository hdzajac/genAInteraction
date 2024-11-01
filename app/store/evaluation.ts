import { create } from 'zustand'

export type EvaluationReport = {
  diagnosis: string
  treatment: string
  imageQuality: string
  visualFeatures: string
  educationalComments: string
}

type EvaluationState = {
  evaluation: EvaluationReport
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
  updateEvaluation(updatedValues) {
    set((state) => ({
      evaluation: {
        ...state.evaluation,
        ...updatedValues,
      },
    }))
  },
}))
