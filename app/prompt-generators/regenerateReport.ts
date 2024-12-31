import { openai } from '@ai-sdk/openai'
import { generateText, streamText } from 'ai'

import type { Flags } from '@/components/FeatureFlag/useFlags'
import { EvaluationLabels } from '@/constants'
import { RegeneratePayload } from '@/hooks/useOpenAI'
import systemPrompt from './helpers/system-prompt'

export default async function (
  { originalReport, updatedSection, sectionName }: RegeneratePayload,
  flags: Flags
) {
  console.log('REGENERATE > PAYLOAD >', originalReport, updatedSection, sectionName)

  const prompt = `
    Update the existing report with with the new content.
    - Only modify the required section, but return the entire report
    - Only modify the parts that relate to the new content
    - Maintain the original structure and context of the report
    - If the updated section is empty, remove the section from the report
    - If the section doesn't exist in the original report, add it to the report
    
    Section to update
    ${EvaluationLabels[sectionName]}

    Updated section:
    ${updatedSection}

    Original report:
    ${originalReport}
    `

  console.log('PROMP', prompt)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  if (flags.streamData) {
    const result = streamText({
      model: openai(flags.model),
      messages: [
        { role: 'system', content: flags.systemPrompt ?? systemPrompt },
        { role: 'user', content: prompt },
      ],
    })

    return result.toTextStreamResponse()
  } else {
    const result = generateText({
      model: openai(flags.model),
      messages: [
        { role: 'system', content: flags.systemPrompt ?? systemPrompt },
        { role: 'user', content: prompt },
      ],
    })

    return (await result).text
  }
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `<h2>Assessment</h2>
          <p>REGENERATED The patient is a <strong>62-year-old male</strong> with a <strong>skin type I</strong>. Upon examination, the lesion displays a <strong>sharp border</strong>, lacks a <strong>pigment network</strong>, and presents with <strong>milia-like cysts</strong>. Additionally, there are noted <strong>fat fingers (6 o’clock)</strong>. Based on these objective findings, the diagnostic evaluation supports the clinical impression of <strong>seborrheic keratosis</strong>.</p>
          <p>Given the benign nature of <strong>seborrheic keratosis</strong> and the absence of symptoms, I suggest no immediate treatment is necessary. The lesion's characteristics are consistent with common presentations and do not indicate malignancy.</p>
          <h2>Primary Plan</h2>
          <p>The primary plan involves <strong>no treatment</strong> at this time for the <strong>seborrheic keratosis</strong>. The patient should be advised to monitor the lesion for any changes, such as increased size, change in color, or any irritation. A follow-up appointment should be scheduled in <strong>6 to 12 months</strong> for re-evaluation or sooner if any concerning changes occur. Additionally, educating the patient on skin cancer awareness and encouraging regular skin examinations will be beneficial for ongoing skin health.</p>`
      )
    }, 200)
  })
}
