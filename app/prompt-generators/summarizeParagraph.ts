import { EvaluationReport } from '@/store/evaluation'
import OpenAI from 'openai'

const client = new OpenAI({})

type Props = {
  paragraph: string
}

export default async function ({ paragraph }: Props) {
  console.log('PAYLOAD', paragraph)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const prompt = `
      You are a dermatologist.
      You are asked to summarize a text to be sent to a general practitioner.
      The report should be written in a professional tone, using appropriate medical terminology and providing detailed information where necessary.
      
      The summary should be concise and should not include any information that is not relevant to the text. Try to reduce the text by half

      The text is following:
    `

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: paragraph },
    ],
  })

  console.log('response>>', completion.choices[0].message.content)

  return completion.choices[0].message.content
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'The dermoscopic image reveals a well-defined lesion under 6 mm, exhibiting a uniform color and sharp borders, indicative of a benign nature. No color or texture irregularities are present, aligning with a stable and non-suspicious appearance.',
      )
    }, 200)
  })
}
