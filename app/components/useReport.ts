import { useState } from 'react'
import { z } from 'zod'

import { SectionKeysMap, SectionTypes } from '@/constants'
import { useOpenAI } from '@/hooks/useOpenAI'
import { useReportStore } from '@/store/report'
import { Patient } from '@/store/types'
import { useRecord } from '@/store/useRecord'
import { ActionTypes } from './ContentEditor'
import { useFlags } from './FeatureFlag/useFlags'

export type Report = {
  content: string
}

export type SectionType = z.infer<typeof SectionTypes>

export function useReport() {
  const { flags } = useFlags()
  const { report, appendToReport, updateReport } = useReportStore()
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

      const response = await generateReport({
        evaluation: record.evaluation,
        patient: generatePatient(record, flags.usePatientData),
        sections,
      })

      setIsLoading(false)

      if (flags.streamData) {
        if (!response || !response.body) return null

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)

          appendToReport(chunk)
        }
      } else {
        const content = await response.json()

        updateReport({
          content: content,
        })
      }
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
