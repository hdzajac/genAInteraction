export type MedicalRecord = {
  id: number
  gender: string
  age: number
  evaluation: EvaluationReport
  images: string[]
}

export type EvaluationReport = {
  diagnosis: string
  treatment: string
  imageQuality: string
  visualFeatures: string
  educationalComments: string
}
