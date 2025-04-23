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
  diagnosis: string
  treatment: string
  alternativePlan: string
  followUp: string
}

export type VisualFeatures = {
  cardname: string
  smartphrase: string
}

export type Diagnosis = {
  cardname: string
}

export type Treatment = {
  cardname: string
}

export type AlternativePlan = {
  
}

export type Followup = {

}


export type Patient = {
  gender: string
  age: number
  skinType: number
  familyWithMelanoma: boolean
  previousMelanoma: boolean
}
