import { ActionTypes } from '@/components/ContentEditor'
import { openai } from '@/openai'

type Props = {
  paragraph: string
  rewriteText: string
  type: ActionTypes
}

export default async function ({ paragraph, rewriteText, type }: Props) {
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

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
  })

  console.log('RESULT:\n', completion.choices[0].message.content)

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
