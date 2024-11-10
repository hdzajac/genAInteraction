import { ActionTypes } from '@/components/ContentEditor'
import { ReportSection } from '@/components/useReport'
import { EvaluationReport } from '@/store/types'

type Payload = {
  action?: string
  payload: Record<string, unknown>
}

type GeneratePayload = {
  evaluation: EvaluationReport
  sections: ReportSection['type'][]
}

type GetAlternativesPayload = {
  paragraph: string
}

type SummarizePayload = {
  paragraph: string
}

type RephrasePayload = {
  paragraph: string
  selection: string
  type: ActionTypes
}

const request = async (payload: Payload) => {
  const token = localStorage.getItem('token') ?? ''

  return fetch('http://localhost:3000/api/llm', {
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
    async getAlternatives(payload: GetAlternativesPayload) {
      return request({
        action: 'GET_ALTERNATIVES',
        payload,
      })
    },
    async summarizeParagraph(payload: SummarizePayload) {
      return request({
        action: 'SUMMARIZE_PARAGRAPH',
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
