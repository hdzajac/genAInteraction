import { ActionTypes } from '@/components/ContentEditor'
import type { Flags } from '@/components/FeatureFlag/useFlags'
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
  flags: Flags
}

type ParagraphPayload = {
  paragraph: string
}

type RephrasePayload = {
  paragraph: string
  selection: string
  type: ActionTypes
}

type RewritePayload = {
  paragraph: string
  rewriteText: string
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
  })
}

export function useOpenAI() {
  return {
    async generateReport(payload: GeneratePayload) {
      return request({
        action: 'GENERATE_REPORT',
        payload,
      })
    },
    async getAlternatives(payload: ParagraphPayload) {
      return request({
        action: 'GET_ALTERNATIVES',
        payload,
      })
    },
    async summarizeParagraph(payload: ParagraphPayload) {
      return request({
        action: 'SUMMARIZE_PARAGRAPH',
        payload,
      })
    },
    async convertToList(payload: ParagraphPayload) {
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
    async rewriteToInclude(payload: RewritePayload) {
      return request({
        action: 'REWRITE_TO_INCLUDE',
        payload,
      })
    },
  }
}
