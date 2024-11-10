import { ActionTypes } from '@/components/ContentEditor'

type Payload = {
  action?: string
  payload: Record<string, unknown>
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
    async generateReport(payload: any) {
      return request({
        action: 'GENERATE_REPORT',
        payload,
      })
    },
    async getAlternatives(paragraph: string) {
      return request({
        action: 'GET_ALTERNATIVES',
        payload: {
          paragraph,
        },
      })
    },
    async summarizeParagraph(paragraph: string) {
      return request({
        action: 'SUMMARIZE_PARAGRAPH',
        payload: {
          paragraph,
        },
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
