type Payload = {
  action?: string
  payload: Record<string, unknown>
}

const request = (payload: Payload) =>
  fetch('http://localhost:3000/api/llm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json())

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
    async rephraseSelection(selection: string, paragraph: string) {
      return request({
        action: 'REPHRASE_SELECTION',
        payload: {
          paragraph,
          selection,
        },
      })
    },
  }
}
