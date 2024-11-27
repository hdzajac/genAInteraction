import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

import { EvaluationLabels, SectionTypes, SkinTypes } from '@/constants'
import { openai } from '@/openai'
import { EvaluationReport, Patient } from '@/store/types'
import sectionsInfo from './helpers/sections-info'

const ReportFormat = z.object({
  report: z.array(
    z.object({
      type: SectionTypes,
      content: z.string(),
    })
  ),
})

type Props = {
  evaluation: EvaluationReport
  sections: string[]
  patient: Patient
}

export default async function ({ evaluation, patient, sections }: Props) {
  console.log('PAYLOAD', sections)

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
      - ${sec.title} (${sec.type}): ${sec.description}`
    })
    .join('\n')

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

  const prompt = `
      You are a dermatologist.
      You are writing a report to be sent to a general practitioner.
      The report should be written in a professional tone, using appropriate medical terminology and providing detailed information where necessary. 

      The report should include the following sections:
      ${sectionsPrompt}

      ${generatePatientPrompt(patient)}
      The patient' condition is as follows: ${evaluationPrompt}

      Use the patient condition when creating the report, and put the input data that is used in the report surrounded by the html tag <strong></strong>.

    `
  console.log('PROMPT', prompt)

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    response_format: zodResponseFormat(ReportFormat, 'report'),
  })

  console.log('response>>', completion.choices[0].message.parsed?.report)

  return completion.choices[0].message.parsed?.report
}

function testingMode() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          type: 'VISUAL_DESCRIPTION',
          content:
            'The lesion presents with a sharp border and lacks a pigment network, characteristic of <strong>seborrheic keratosis</strong>. Notably, the lesion features <strong>milia-like cysts</strong> and appears to be situated at the 6 o’clock position, indicative of possible irritation or friction due to <strong>fat fingers</strong>.',
        },
        {
          type: 'ASSESSMENT',
          content:
            'Given the diagnosis of <strong>seborrheic keratosis</strong> and the absence of concerning features, <strong>no treatment</strong> is currently indicated. The lesion appears benign and does not require immediate intervention.',
        },
        {
          type: 'PRIMARY_PLAN',
          content:
            'The recommended plan is to monitor the lesion for any changes in size, shape, or color over time. Patient education regarding the benign nature of <strong>seborrheic keratosis</strong> should be provided, emphasizing that no treatment is necessary unless the lesion becomes symptomatic or cosmetically concerning. A follow-up appointment can be scheduled in 6 to 12 months to reassess the lesion and consider treatment options if warranted.',
        },
      ])
    }, 1000)
  })
}

function generatePatientPrompt(patient: Patient) {
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
