import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { z } from 'zod'

import { authMiddleware } from '@/auth'
import convertToList from '@/prompt-generators/convertToList'
import generateAlternatives from '@/prompt-generators/generateAlternatives'
import generateReport from '@/prompt-generators/generateReport'
import rephraseSelection from '@/prompt-generators/rephraseSelection'
import rewriteToInclude from '@/prompt-generators/rewriteToInclude'
import summarizeParagraph from '@/prompt-generators/summarizeParagraph'

export const config = { runtime: 'nodejs' }

const GeneratorActions = z.enum([
  'GENERATE_REPORT',
  'GET_ALTERNATIVES',
  'SUMMARIZE_PARAGRAPH',
  'REPHRASE_SELECTION',
  'CONVERT_TO_LIST',
  'REWRITE_TO_INCLUDE',
])

export async function action({ request }: ActionFunctionArgs) {
  return authMiddleware(request, async () => {
    const body = await request.json()

    if (!body.action || !body.payload) {
      return json({ error: 'Missing action or payload' }, { status: 400 })
    }

    try {
      let result
      switch (body.action) {
        case GeneratorActions.Enum.GENERATE_REPORT:
          return generateReport(body.payload)
        case GeneratorActions.Enum.GET_ALTERNATIVES:
          result = await generateAlternatives(body.payload)
          break
        case GeneratorActions.Enum.SUMMARIZE_PARAGRAPH:
          result = await summarizeParagraph(body.payload)
          break
        case GeneratorActions.Enum.REPHRASE_SELECTION:
          result = await rephraseSelection(body.payload)
          break
        case GeneratorActions.Enum.CONVERT_TO_LIST:
          result = await convertToList(body.payload)
          break
        case GeneratorActions.Enum.REWRITE_TO_INCLUDE:
          result = await rewriteToInclude(body.payload)
          break
        default:
          return json({ error: 'Invalid action' }, { status: 400 })
      }
      return json(result)
    } catch (error) {
      return json({ error })
    }
  })
}
