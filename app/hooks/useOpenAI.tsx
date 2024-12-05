import { ActionTypes } from '@/components/ContentEditor'
import { ReportSection } from '@/components/useReport'
import { EvaluationReport, Patient } from '@/store/types'

type Payload = {
  action?: string
  payload: Record<string, unknown>
}

export type GeneratePayload = {
  evaluation: EvaluationReport
  patient: Patient | undefined
  sections: ReportSection['type'][]
  includeExamplesInPrompts?: boolean
}

type ParagrahPayload = {
  paragraph: string
}

type RephrasePayload = {
  paragraph: string
  selection: string
  type: ActionTypes
}

const request = async (payload: Payload) => {
  const token = localStorage.getItem('token') ?? ''

  return fetch('/api/llm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json())
}

export function useOpenAI() {
  return {
    async generateReport(payload: GeneratePayload) {
      return request({
        action: 'GENERATE_REPORT',
        payload,
      })
    },
    async getAlternatives(payload: ParagrahPayload) {
      return request({
        action: 'GET_ALTERNATIVES',
        payload,
      })
    },
    async summarizeParagraph(payload: ParagrahPayload) {
      return request({
        action: 'SUMMARIZE_PARAGRAPH',
        payload,
      })
    },
    async convertToList(payload: ParagrahPayload) {
      return request({
        action: 'CONVERT_TO_LIST',
        payload,
      })
    },
    async rephraseSelection(payload: RephrasePayload) {
      return request({
        action: 'REPHRASE_SELECTION',
        payload,
      })
    },
  }
}
