import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

import { EvaluationLabels, SectionTypes } from '@/constants'
import { openai } from '@/openai'
import { EvaluationReport } from '@/store/types'

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
  {
    type: 'FOLLOW_UP',
    title: 'Follow-up',
    description:
      'Your suggestion of the next steps after the completion of the primary and alternative plans',
    examples: [
      'Should the above fail to lead to improvement in the next 4-6 weeks I recommend evaluation by a dermatologist face-to-face. ',
    ],
  },
]

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
}

export default async function ({ evaluation, sections }: Props) {
  console.log('PAYLOAD>>', evaluation, sections)

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
      const sec = sectionInfo.find((info) => info.type === section)

      if (!sec) return ''

      return `
      - ${sec.title} (${sec.type}): ${sec.description}`
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

      You receive the following input, which describes the patient's condition:
      ${evaluationPrompt}

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
