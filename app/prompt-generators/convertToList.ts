import { ActionTypes } from '@/components/ContentEditor'
import { openai } from '@/openai'
import type { Flags } from '@/components/FeatureFlag/useFlags'

type Props = {
  paragraph: string
}

export default async function ({ paragraph }: Props, flags: Flags) {
  console.log('CONVERT TO LIST > PAYLOAD >', paragraph)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const prompt = `
      You are a dermatologist.
      You are writing a report to be sent to a general practitioner.
      
      Convert the following text to bullet list. Each item should start with a dash (-):
      ${paragraph}
    `

  console.log('PROMP', prompt)

  const completion = await openai.chat.completions.create({
    model: flags.model,
    messages: [{ role: 'system', content: prompt }],
  })

  console.log('RESULT', completion.choices[0].message.content)

  return completion.choices[0].message.content
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `- The lesion is diagnosed as seborrheic keratosis, which is benign in nature.  
- There are no symptoms associated with the lesion.  
- Immediate treatment is not necessary at this time.  
- The characteristics of the lesion are consistent with common presentations of seborrheic keratosis.  
- There are no indications of malignancy associated with the lesion.`
      )
    }, 200)
  })
}
