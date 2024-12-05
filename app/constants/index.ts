import { z } from 'zod'

export const SectionTypes = z.enum([
  'ASSESSMENT',
  'PRIMARY_PLAN',
  'ALTERNATIVE_PLAN',
  'FOLLOW_UP',
])

export const SectionKeysMap = {
  ASSESSMENT: 'diagnosis',
  PRIMARY_PLAN: 'treatment',
  ALTERNATIVE_PLAN: 'alternativePlan',
  FOLLOW_UP: 'followUp',
} as const

export const EvaluationLabels: Record<string, string> = {
  visualFeatures: 'Visual Features',
  diagnosis: 'Diagnostic',
  treatment: 'Treatment',
  alternativePlan: 'Alternate Plan',
  followUp: 'Follow Up',
}

export const SkinTypes: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
}
