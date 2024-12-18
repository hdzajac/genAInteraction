export default [
  {
    type: 'ASSESSMENT',
    title: 'Assessment',
    description:
      'Your interpretation of the visual findings in the light of the referral and your problem understanding',
    examples: [
      'The dermoscopic image reveals a 4-5mm irregular blue papule. There are shiny white structures present. The blue color is not homogeneous, and the presence of shiny white structures would not be typical for a blue nevus',
      "The clinical presentation is consistent with rosacea, a chronic inflammatory skin condition. The patient's symptoms, including facial erythema, flushing, and the presence of papules and pustules, are consistent with a diagnosis of papulopustular rosacea",
    ],
  },
  {
    type: 'PRIMARY_PLAN',
    title: 'Primary plan',
    description: 'The recommended treatment plan, including instructions if necessary',
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
