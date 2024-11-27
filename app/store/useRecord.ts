import { create } from 'zustand'

import { MedicalRecord } from './types'

type MedicalRecordState = {
  record: MedicalRecord
  updateRecord(record: MedicalRecord): void
  updateEvaluation(evaluation: MedicalRecord['evaluation']): void
}

export const useRecord = create<MedicalRecordState>((set) => ({
  record: undefined as unknown as MedicalRecord,
  updateRecord(updatedValues) {
    set((state) => ({
      record: {
        ...state.record,
        ...updatedValues,
      },
    }))
  },
  updateEvaluation(updatedValues) {
    set((state) => ({
      ...state,
      evaluation: {
        ...state.record.evaluation,
        ...updatedValues,
      },
    }))
  },
}))
