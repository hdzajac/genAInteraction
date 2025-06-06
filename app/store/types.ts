export type MedicalRecord = {
  id: number
  gender: string
  age: number
  skinType: number
  familyWithMelanoma: boolean
  previousMelanoma: boolean
  evaluation: EvaluationReport
  images: string[]
}

export type EvaluationReport = {
  visualFeatures: VisualFeatures[]
  diagnosis: Diagnosis[]
  treatment: Treatment[]
  alternativePlan: AlternativePlan[]
  followUp: FollowUp[]
}

export type VisualFeatures = {
  cardname: string
  smartphrase: string
}

export type Diagnosis = {
  cardname: string
  smartphrase: string
}

export type Treatment = {
  cardname: string
  smartphrase: string
}

export type AlternativePlan = {
  cardname: string
  smartphrase: string
}

export type FollowUp = {
  cardname: string
  smartphrase: string
}


export type Patient = {
  gender: string
  age: number
  skinType: number
  familyWithMelanoma: boolean
  previousMelanoma: boolean
}
