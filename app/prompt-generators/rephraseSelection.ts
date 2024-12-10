import { ActionTypes } from '@/components/ContentEditor'
import { openai } from '@/openai'

type Props = {
  paragraph: string
  selection: string
  type: ActionTypes
}

export default async function ({ paragraph, selection, rewriteText, type }: Props) {
  console.log('PAYLOAD', paragraph, selection, type)

  let prompt = `
        You are a dermatologist.
        You are writing a report to be sent to a general practitioner.
    `

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  switch (type) {
    case 'SIMPLIFY':
      prompt += `
        Rephrase the selection to be shorter and use simpler language. It should be half the length of the original selection.
        The selection to be rephrased is following:
        ${selection}

        That selection is part of the following paragraph:
        ${paragraph}

        Only rewrite the selection and not the entire paragraph.
        Return the whole paragraph, and put the rephrased selection surrounded by the html tag <span id="{{id}}" class="text-modified"></span>.
        `
      break

    case 'CONVERT_TO_LIST':
      prompt += `
        Convert the following text to bullet list. Each item should start with a dash (-):
        ${paragraph}`
      break

    case 'REWRITE_TO_INCLUDE':
      prompt += `
        Rewrite the selection to include the following text: "${rewriteText}"
        
        The selection is following:
        ${selection}

        That selection is part of the following paragraph:
        ${paragraph}

        Only rewrite the selection and not the entire paragraph.
        Return the whole paragraph, and put the new text surrounded by the html tag <span id="{{id}}" class="text-modified"></span>.`
      break
  }

  console.log('PROMP', prompt)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
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
        `- The lesion is diagnosed as seborrheic keratosis, which is benign in nature.  
- There are no symptoms associated with the lesion.  
- Immediate treatment is not necessary at this time.  
- The characteristics of the lesion are consistent with common presentations of seborrheic keratosis.  
- There are no indications of malignancy associated with the lesion.`
        //         `<ul>
        //     <li>Patient: 60-year-old man</li>
        //     <li>Family history: Skin cancer</li>
        //     <li>Symptoms: Mild itching around a skin lesion</li>
        //     <li>Denies: Pain or bleeding</li>
        //     <li>Previous procedures: No biopsies or treatments for this lesion</li>
        // </ul>`
        // 'The dermoscopic image presents a well-defined lesion measuring less than 6 mm with a uniform color, indicating a consistent morphology. The borders of the lesion are <span id="1113322" class="text-modified">well-defined, indicating benign characteristics without color irregularities</span>. There are no irregularities in color or texture observed, which is consistent with a stable and non-suspicious appearance.'
      )
    }, 200)
  })
}
