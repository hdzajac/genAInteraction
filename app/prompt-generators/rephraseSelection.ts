import { ActionTypes } from '@/components/ContentEditor'
import type { Flags } from '@/components/FeatureFlag/useFlags'
import { openai } from '@/openai'

type Props = {
  paragraph: string
  selection: string
  type: ActionTypes
}

export default async function ({ paragraph, selection, type }: Props, flags: Flags) {
  console.log('REPHRASE > PAYLOAD >', paragraph, selection, type)

  const prompt = `
    You are a dermatologist writing a report to be sent to a general practitioner.

    Prompt Details:
    - Rephrase the specified text to be more concise
    - Use simpler, more direct language
    - Reduce the length by approximately 50%
    - Maintain clinical accuracy and clarity

    
    The selection to be rephrased is following:
    ${selection}

    That selection is part of the following paragraph:
    ${paragraph}

    Requirements:
    - Only modify the specified selection within the paragraph
    - Return the whole paragraph
    - Wrap the modified text with the html tag <span id="{{id}}" class="text-modified"></span>.
    `

  console.log('PROMP', prompt)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const completion = await openai.chat.completions.create({
    model: flags.model,
    messages: [{ role: 'system', content: prompt }],
  })

  console.log('RESULT', completion.choices[0].message.content)

  // Generate a random ID
  const id = Math.random().toString(36).substring(2, 10)
  return completion.choices[0].message.content?.replace(/\{\{id\}\}/, id)
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
