import { openai } from '@ai-sdk/openai'
import { generateText, streamText } from 'ai'

import type { Flags } from '@/components/FeatureFlag/useFlags'
import { EvaluationLabels, SkinTypes } from '@/constants'
import { GeneratePayload } from '@/hooks/useOpenAI'
import { EvaluationReport, Patient } from '@/store/types'
import sectionsInfo from './helpers/sections-info'

export default async function ({ evaluation, patient, sections }: GeneratePayload, flags: Flags) {
  console.log('PAYLOAD', flags)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const evaluationPrompt = (Object.keys(evaluation) as Array<keyof EvaluationReport>)
    .filter((key) => evaluation[key] !== '')
    .map((key) => {
      return `
    - ${EvaluationLabels[key]}: ${evaluation[key]}`
    })

  const sectionsPrompt = sections
    .map((section) => {
      const sec = sectionsInfo.find((info) => info.type === section)

      if (!sec) return ''

      return `
      - ${sec.title}: ${sec.description}`
    })
    .join('\n')

  const prompt = `
      You are an experienced dermatologist preparing a professional medical report for a general practitioner referral.
      
      Context and Expectations:
        - Use precise, concise medical language
        - Demonstrate clear clinical reasoning
        - Ensure all information is clinically relevant
        - Write in a professional tone, using appropriate medical terminology.

      The report should include the following sections ${sectionsPrompt}

      ${generatePatientPrompt(patient)}
      The patient' condition is as follows: ${evaluationPrompt}

      Write the report using the html tag <h2> for sections and <p> for paragraphs. 
      Put the input data that is used in the report surrounded by the html tag <strong></strong>.
      
      ${generateExamplesPrompt(sections, flags.includeExamplesInPrompts)}`

  console.log('PROMPT', prompt)

  if (flags.streamData) {
    const result = streamText({
      model: openai(flags.model),
      messages: [{ role: 'system', content: prompt }],
    })

    return result.toTextStreamResponse()
  } else {
    const result = generateText({
      model: openai(flags.model),
      messages: [{ role: 'system', content: prompt }],
    })

    return (await result).text
  }
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `<h2>Assessment</h2>
          <p>The patient is a <strong>62-year-old male</strong> with a <strong>skin type I</strong>. Upon examination, the lesion displays a <strong>sharp border</strong>, lacks a <strong>pigment network</strong>, and presents with <strong>milia-like cysts</strong>. Additionally, there are noted <strong>fat fingers (6 o’clock)</strong>. Based on these objective findings, the diagnostic evaluation supports the clinical impression of <strong>seborrheic keratosis</strong>.</p>
          <p>Given the benign nature of <strong>seborrheic keratosis</strong> and the absence of symptoms, I suggest no immediate treatment is necessary. The lesion's characteristics are consistent with common presentations and do not indicate malignancy.</p>
          <h2>Primary Plan</h2>
          <p>The primary plan involves <strong>no treatment</strong> at this time for the <strong>seborrheic keratosis</strong>. The patient should be advised to monitor the lesion for any changes, such as increased size, change in color, or any irritation. A follow-up appointment should be scheduled in <strong>6 to 12 months</strong> for re-evaluation or sooner if any concerning changes occur. Additionally, educating the patient on skin cancer awareness and encouraging regular skin examinations will be beneficial for ongoing skin health.</p>`
      )
    }, 200)
  })
}

function generatePatientPrompt(patient: Patient | undefined) {
  if (!patient) return ''

  let patientPrompt = `The patient is ${patient.gender}, ${patient.age} years old, and skin type ${
    SkinTypes[patient.skinType]
  }.`

  if (patient.familyWithMelanoma) {
    patientPrompt += ' The patient has a family history of melanoma.'
  }

  if (patient.previousMelanoma) {
    patientPrompt += ' The patient has had a previous malignant melanoma or skin cancer.'
  }

  return patientPrompt + '\n'
}

function generateExamplesPrompt(
  sections: ReportSection['type'][],
  includeExamplesInPrompts: boolean
) {
  if (!includeExamplesInPrompts) return ''

  const examplesPrompt = sections
    .map((section) => {
      const sec = sectionsInfo.find((info) => info.type === section)

      if (!sec) return ''

      return `
      ### ${sec.title}
      - ${sec.examples.join('\n -')}
    `
    })
    .join('\n')

  return `Here are some examples of reports:
      ${examplesPrompt}`
}
