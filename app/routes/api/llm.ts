import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'
import { z } from 'zod'

import { authMiddleware } from '@/auth'
import generateAlternatives from '@/prompt-generators/generateAlternatives'
import generateReport from '@/prompt-generators/generateReport'
import rephraseSelection from '@/prompt-generators/rephraseSelection'
import summarizeParagraph from '@/prompt-generators/summarizeParagraph'

const GeneratorActions = z.enum([
  'GENERATE_REPORT',
  'GET_ALTERNATIVES',
  'SUMMARIZE_PARAGRAPH',
  'REPHRASE_SELECTION',
])

type RequestBody = {
  action?: (typeof GeneratorActions.Enum)[keyof typeof GeneratorActions.Enum]
  /** String of text to be feed to the LLM */
  payload: any
}

export const Route = createAPIFileRoute('/api/llm')({
  POST: (ctx) =>
    authMiddleware(ctx, async ({ request, params }) => {
      const body = (await request.json()) as RequestBody

      switch (body.action) {
        case GeneratorActions.Enum.GENERATE_REPORT:
          return json(await generateReport(body.payload))
        case GeneratorActions.Enum.GET_ALTERNATIVES:
          return json(await generateAlternatives(body.payload))
        case GeneratorActions.Enum.SUMMARIZE_PARAGRAPH:
          return json(await summarizeParagraph(body.payload))
        case GeneratorActions.Enum.REPHRASE_SELECTION:
          return json(await rephraseSelection(body.payload))
        default:
          return json(null)
      }
    }),
})
