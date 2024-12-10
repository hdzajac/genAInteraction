import { useState } from 'react'
import { z } from 'zod'

import { SectionKeysMap, SectionTypes } from '@/constants'
import { useOpenAI } from '@/hooks/useOpenAI'
import { useReportStore } from '@/store/report'
import { useRecord } from '@/store/useRecord'
import { ActionTypes } from './ContentEditor'
import { useFlags } from './FeatureFlag/useFlags'
import { Patient } from '@/store/types'

export type Report = {
  date: Date
  author: string
  content: string
}

export type ReportSection = {
  type: SectionType
  content: string
}

export type Alternative = {
  content: string
}

export type SectionType = z.infer<typeof SectionTypes>

export function useReport() {
  const { flags } = useFlags()
  const { report, updateReport } = useReportStore()
  const { record } = useRecord()
  const { generateReport, summarizeParagraph, rephraseSelection, convertToList } = useOpenAI()
  const [isLoading, setIsLoading] = useState(false)

  return {
    isLoading,
    report,
    /**
     * Create a report based on the evaluation
     */
    createReport: async () => {
      setIsLoading(true)

      const sections = Object.keys(SectionKeysMap).filter(
        (s) => record.evaluation[SectionKeysMap[s as keyof typeof SectionKeysMap]] !== ''
      ) // Filter out sections where the corresponding evaluation is empty

      const result = await generateReport({
        evaluation: record.evaluation,
        patient: generatePatient(record, flags.usePatientData),
        includeExamplesInPrompts: flags.includeExamplesInPrompts,
        sections,
      })

      setIsLoading(false)

      updateReport({
        date: new Date(),
        author: 'Dr. John Doe',
        content: result,
      })
    },
    regenerate: async () => {
      setIsLoading(true)

      const result = await generateReport({
        evaluation: record.evaluation,
        patient: generatePatient(record, flags.usePatientData),
        includeExamplesInPrompts: flags.includeExamplesInPrompts,
        sections: report.sections.map((s) => s.type),
      })

      setIsLoading(false)

      updateReport({
        date: new Date(),
        author: 'Dr. John Doe',
        content: result,
      })
    },

    generateSection: async (id: SectionType) => {
      const section = await generateReport({
        evaluation: record.evaluation,
        sections: [id],
        patient: generatePatient(record, flags.usePatientData),
        includeExamplesInPrompts: flags.includeExamplesInPrompts,
      })

      const newSection = section.find((s) => s.type === id)

      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id) return section

          return {
            ...section,
            content: newSection.content,
          }
        }),
      })
    },
    updateContent: async (id: SectionType, content: string) => {
      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id) return section

          return {
            ...section,
            content,
          }
        }),
      })
    },
    pickAlternative: (id: SectionType, alternative: Alternative) => {
      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id) return section

          return {
            ...section,
            content: alternative.content,
          }
        }),
      })
    },
    rephraseSelection: async (type: ActionTypes, selection: string, paragraph: string) => {
      // const paragraph = report.sections.find((s) => s.type === id)?.content ?? ''
      const newText = await rephraseSelection({ paragraph, selection, type })

      updateReport({
        ...report,
        content: report.content.replace(paragraph, newText),
      })
    },
  }
}

function generatePatient(record: Patient, usePatientData: boolean) {
  if (!usePatientData) {
    return undefined
  }

  return {
    age: record.age,
    gender: record.gender,
    skinType: record.skinType,
    familyWithMelanoma: record.familyWithMelanoma,
    previousMelanoma: record.previousMelanoma,
  }
}
