import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { z } from 'zod'

import { SectionTypes } from '@/components/useReport'
import { EvaluationReport } from '@/store/types'

const client = new OpenAI({})

export const sectionInfo = [
  {
    type: 'VISUAL_DESCRIPTION',
    title: 'Objective visual description',
    description: 'Your read of the image a description of objective and visual features',
    examples: [
      'The dermoscopic image reveals a 4-5mm irregular blue papule. There are shiny white structures present. The blue color is not homogeneous, and the presence of shiny white structures would not be typical for a blue nevus',
    ],
  },
  {
    type: 'ASSESSMENT',
    title: 'Assessment',
    description:
      'Your first suggestion for immediate next steps (treatment, patient care, dismissal).',
    examples: [
      "The clinical presentation is consistent with rosacea, a chronic inflammatory skin condition. The patient's symptoms, including facial erythema, flushing, and the presence of papules and pustules, are consistent with a diagnosis of papulopustular rosacea",
    ],
  },
  {
    type: 'PRIMARY_PLAN',
    title: 'Primary plan',
    description:
      'The recommended treatment plan, including any necessary follow-up appointments or instructions',
    examples: [
      'I would recommend topical treatment with metronidazole 0.75% gel 1-2 times. daily for 3-4 months, can be extended in case of positive effect and relapse. In the event of a lack of effect, consider starting for the time being. in oral treatment with oracea (doxycycline 40 mg) once daily for 3 months. Recommend a daily mild cleanser and a broad-spectrum sunscreen (SPF 30 or higher) to protect against UV-induced flare-ups.',
    ],
  },
  {
    type: 'ALTERNATIVE_PLAN',
    title: 'Alternative plan',
    description:
      'An alternative to your first suggestion, either because there are possible alternative treatment plans or because of the conditionality of the assessment.',
    examples: [
      'Of note, if the patient/parent feels this rash is consist with prior atopic dermatitis flares she has had, she might benefit from a non-steroid for the face and neck, such as tacrolimus oint 0.1%. ',
    ],
  },
]

const ReportFormat = z.object({
  report: z.array(
    z.object({
      type: SectionTypes,
      content: z.string(),
    }),
  ),
})

type Props = {
  evaluation: EvaluationReport
  sections: string[]
}

export default async function ({ evaluation, sections }: Props) {
  console.log('PAYLOAD>>', evaluation, sections)

  if (process.env.TESTING_MODE === 'true') {
    return testingMode()
  }

  const sectionsPrompt = sections
    .map((section) => {
      const sec = sectionInfo.find((info) => info.type === section)

      if (!sec) return ''

      return `- ${sec.title} (${sec.type}): ${sec.description}`
    })
    .join('\n')

  const examplesPrompt = sections
    .map((section) => {
      const sec = sectionInfo.find((info) => info.type === section)

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

      You receive the following input, which is a text description of a patient's condition:
        - Diagnosis: ${evaluation.diagnosis}
        - Treatment: ${evaluation.treatment}
        - Image Quality: ${evaluation.imageQuality}
        - Visual features: ${evaluation.visualFeatures}
        - Educational comments: ${evaluation.educationalComments}

      Use that information when creating the report.

      ## Here are some examples for each section:

      ${examplesPrompt}
    `

  console.log('PROMPT', prompt)

  const completion = await client.beta.chat.completions.parse({
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
            'The dermoscopic image presents a well-defined lesion measuring less than 6 mm with a uniform color, indicating a consistent morphology. The borders of the lesion are sharp, suggesting a demarcated border indicative of a benign nature. There are no irregularities in color or texture observed, which is consistent with a stable and non-suspicious appearance.',
        },
        {
          type: 'ASSESSMENT',
          content:
            'The clinical findings are suggestive of an Alm venus lesion, which appears benign in appearance based on its characteristics of uniform color, pronounced border, and size. Given the nature of the lesion and the recommendation of observation, I agree with the initial management plan.',
        },
        {
          type: 'PRIMARY_PLAN',
          content:
            "Continue with observation to monitor any changes in the lesion's characteristics. Instruct the patient to apply broad-spectrum sunscreen daily to protect against UV damage, which could alter the appearance of the lesion. A follow-up appointment should be scheduled in 6 months to reassess the lesion for any changes in size or color and to ensure ongoing monitoring.",
        },
        {
          type: 'ALTERNATIVE_PLAN',
          content:
            'Alternatively, if any changes in the lesion occur before the scheduled follow-up, consider a biopsy to rule out any malignancy or premalignant changes. Also, educate the patient about the signs to watch for, such as changes in size, color, or texture, which would warrant immediate evaluation.',
        },
      ])
    }, 200)
  })
}

// [
//   {
//     type: 'ASSESSMENT',
//     content:
//       'The patient has been diagnosed with an Alm venus. The lesion exhibits a uniform color, sharp borders, and is less than 6 mm in size. The image quality of the presentation is good, allowing for precise assessment. Given the described characteristics, the lesion appears benign, and the current treatment plan comprises observation.',
//   },
//   {
//     type: 'PRIMARY_PLAN',
//     content:
//       'Continue with observation for the Alm venus lesion. Instruct the patient on the importance of using sunscreen daily to protect the skin from ultraviolet radiation, as this can help prevent any changes in the lesion and promote overall skin health. Recommend follow-up appointments at a six-month interval to reassess the lesion for any changes.',
//   },
// ]
