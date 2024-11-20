import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { z } from 'zod'

import generateAlternatives from '@/prompt-generators/generateAlternatives'
import generateReport from '@/prompt-generators/generateReport'
import rephraseSelection from '@/prompt-generators/rephraseSelection'
import summarizeParagraph from '@/prompt-generators/summarizeParagraph'
import { authMiddleware } from '@/auth'

export const config = { runtime: 'nodejs' }

const GeneratorActions = z.enum([
  'GENERATE_REPORT',
  'GET_ALTERNATIVES',
  'SUMMARIZE_PARAGRAPH',
  'REPHRASE_SELECTION',
])

export async function action({ request }: ActionFunctionArgs) {
  return authMiddleware(request, async () => {
    const body = await request.json()

    if (!body.action || !body.payload) {
      return json({ error: 'Missing action or payload' }, { status: 400 })
    }

    let result

    switch (body.action) {
      case GeneratorActions.Enum.GENERATE_REPORT:
        result = await generateReport(body.payload)
        break
      case GeneratorActions.Enum.GET_ALTERNATIVES:
        result = await generateAlternatives(body.payload)
        break
      case GeneratorActions.Enum.SUMMARIZE_PARAGRAPH:
        result = await summarizeParagraph(body.payload)
        break
      case GeneratorActions.Enum.REPHRASE_SELECTION:
        result = await rephraseSelection(body.payload)
        break
      default:
        return json({ error: 'Invalid action' }, { status: 400 })
    }

    return json(result)
  })
}
