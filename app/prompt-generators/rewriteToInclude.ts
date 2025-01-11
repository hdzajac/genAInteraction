import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

import { ActionTypes } from '@/components/ContentEditor'
import type { Flags } from '@/components/FeatureFlag/useFlags'

type Props = {
  paragraph: string
  rewriteText: string
  type: ActionTypes
}

const openai = createOpenAI({
  fetch: fetch,
})

export default async function ({ paragraph, rewriteText, type }: Props, flags: Flags) {
  console.log('REWRITE > PAYLOAD >', type, paragraph, rewriteText)

  const prompt = `
    You are a dermatologist.
    You are writing a report to be sent to a general practitioner.

    Rewrite the provided paragraph to include the following text: "${rewriteText}"
    
    Return the whole paragraph, and put the new text surrounded by the html tag <span id="{{id}}" class="text-modified"></span>.
    ${paragraph}`

  console.log('PROMP', prompt)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const result = generateText({
    model: openai(flags.model),
    messages: [{ role: 'user', content: prompt }],
  })

  const id = Math.random().toString(36).substring(2, 10)
  return (await result).text.replace(/\{\{id\}\}/, id)
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'The dermoscopic image presents a well-defined lesion measuring less than 6 mm with a uniform color, indicating a consistent morphology. The borders of the lesion are <span id="1113322" class="text-modified">well-defined, indicating benign characteristics without color irregularities</span>. There are no irregularities in color or texture observed, which is consistent with a stable and non-suspicious appearance.'
      )
    }, 200)
  })
}
