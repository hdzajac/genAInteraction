import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { z } from 'zod'

const ParagraphsFormat = z.object({
  alternatives: z.array(
    z.object({
      content: z.string(),
    }),
  ),
})

type Props = {
  paragraph: string
}

const client = new OpenAI({})

export default async function ({ paragraph }: Props) {
  console.log('PAYLOAD>>', paragraph)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const prompt = `
      You are a medical doctor.
      Take the following text and create two alternative versions.
      The first one should be revised to add bit more of detail and context.
      The second should be revised to be more concise and shorter:'
    `

  const completion = await client.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: paragraph },
    ],
    response_format: zodResponseFormat(ParagraphsFormat, 'alternatives'),
  })

  console.log('response>>', completion.choices[0].message.parsed?.alternatives)

  return completion.choices[0].message.parsed?.alternatives
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          content:
            'The patient is a 60-year-old man who has a significant family history of skin cancer, which raises concern for potential malignant changes. He presents with a lesion on his skin and reports experiencing mild itching in the surrounding area. Importantly, he denies experiencing any pain, bleeding, or other troubling symptoms associated with the lesion. It is noteworthy that this lesion has not undergone any previous biopsies or treatments, highlighting the need for a thorough examination and possible intervention.',
        },
        {
          content:
            'A 60-year-old man with a family history of skin cancer reports mild itching around a skin lesion but denies pain or bleeding. He has not had any biopsies or treatments for this lesion before.',
        },
      ])
    }, 200)
  })
}
