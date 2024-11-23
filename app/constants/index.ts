import { z } from 'zod'

export const SectionTypes = z.enum([
  'VISUAL_DESCRIPTION',
  'ASSESSMENT',
  'PRIMARY_PLAN',
  'ALTERNATIVE_PLAN',
  'FOLLOW_UP',
])

export const SectionKeysMap = {
  VISUAL_DESCRIPTION: 'visualFeatures',
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
