import { ActionTypes } from '@/components/ContentEditor'
import { openai } from '@/openai'

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
      You are writing a report to be sent to a general practitioner.
      Convert a text for a bullet list. The text should be outputed with an <ul> tag. The text is following:
      ${paragraph}
    `

  console.log('PROMP', prompt)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
  })

  console.log('RESULT', completion.choices[0].message.content)

  return completion.choices[0].message.content
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `
        <ul>
            <li>Monitor the lesion for changes in size, shape, or color over time.</li>
            <li>Provide patient education on the benign nature of <strong>seborrheic keratosis</strong>.</li>
            <li>Emphasize that no treatment is necessary unless the lesion becomes symptomatic or cosmetically concerning.</li>
            <li>Schedule a follow-up appointment in 6 to 12 months to reassess the lesion.</li>
            <li>Consider treatment options if warranted during the follow-up visit.</li>
        </ul>
        `
      )
    }, 200)
  })
}
