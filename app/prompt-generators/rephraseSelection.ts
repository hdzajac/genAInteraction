import { ActionTypes } from '@/components/ContentEditor'
import { openai } from '@/openai'

type Props = {
  paragraph: string
  selection: string
  type: ActionTypes
}

const typeInstructions = {
  SIMPLIFY: 'Rephrase the selection to use a simpler language',
  MAKE_SHORTER:
    'Rephrase the selection to be shorter. It should be half the length of the original selection.',
  MAKE_LONGER:
    'Expand the selection to be longer, giving a more detailed explanation. It should be twice the length of the original selection.',
}
export default async function ({ paragraph, selection, type }: Props) {
  console.log('PAYLOAD', paragraph, selection, type)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const prompt = `
      You are a dermatologist.
      You are writing a report to be sent to a general practitioner.
      ${typeInstructions[type]}
      
      The selection to be rephrased is following:
      ${selection}

      That selection is part of the following paragraph:
      ${paragraph}

      Only rewrite the selection and not the entire paragraph.
      Return the whole paragraph, and put the rephrased selection surrounded by the html tag <span id="{{id}} class="mark-changed"></span>.
    `

  console.log('PROMP', prompt)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
  })

  // Generate a random ID
  const id = Math.random().toString(36).substring(2, 10)
  return completion.choices[0].message.content?.replace(/\{\{id\}\}/, id)
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'The dermoscopic image presents a well-defined lesion measuring less than 6 mm with a uniform color, indicating a consistent morphology. The borders of the lesion are <span id="1113322" class="mark-changed">well-defined, indicating benign characteristics without color irregularities</span>. There are no irregularities in color or texture observed, which is consistent with a stable and non-suspicious appearance.'
      )
    }, 200)
  })
}
