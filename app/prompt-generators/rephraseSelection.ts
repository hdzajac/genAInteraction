import OpenAI from 'openai'

const client = new OpenAI({})

type Props = {
  paragraph: string
  selection: string
}

export default async function ({ paragraph, selection }: Props) {
  console.log('PAYLOAD', paragraph, selection)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const prompt = `
      You are a dermatologist.
      You are writing a report to be sent to a general practitioner.
      You are asked to rephrase selection of text. You should rephrase the selection to be more concise and to the point.
      
      The selection to be rephrased is following:
      ${selection}

      That selection is part of the following paragraph:
      ${paragraph}

      You should only rewrite the selection and not the entire paragraph.
      Return the whole paragraph, and put the rephrased selection surrounded by the html tag <strong></strong>.
    `

  console.log('PROMP', prompt)

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
  })

  console.log('response>>', completion.choices[0].message.content)

  return completion.choices[0].message.content
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'The dermoscopic image presents a well-defined lesion measuring less than 6 mm with a uniform color, indicating a consistent morphology. The borders of the lesion are <strong>well-defined, indicating benign characteristics without color irregularities</strong>. There are no irregularities in color or texture observed, which is consistent with a stable and non-suspicious appearance.',
      )
    }, 200)
  })
}
