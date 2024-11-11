import { useState } from 'react'
import { z } from 'zod'

import { useOpenAI } from '@/hooks/useOpenAI'
import { useEvaluationStore } from '@/store/evaluation'
import { useReportStore } from '@/store/report'
import { ActionTypes } from './ContentEditor'

export const SectionTypes = z.enum([
  'VISUAL_DESCRIPTION',
  'ASSESSMENT',
  'PRIMARY_PLAN',
  'ALTERNATIVE_PLAN',
])

export type Report = {
  date: Date
  author: string
  sections: ReportSection[]
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
  const { report, updateReport } = useReportStore()
  const { evaluation } = useEvaluationStore()
  const { generateReport, summarizeParagraph, rephraseSelection } = useOpenAI()
  const [isLoading, setIsLoading] = useState(false)

  return {
    isLoading,
    report,
    /**
     * Create a report based on the evaluation
     */
    createReport: async () => {
      setIsLoading(true)

      const sections = report.sections
        .filter((s) => s.content === '' || s.content === '<p></p>')
        .map((section) => section.type)
      const result = await generateReport({ evaluation, sections })

      setIsLoading(false)

      updateReport({
        date: new Date(),
        author: 'Dr. John Doe',
        sections: result,
      })
    },
    /**
     * Deletes a section from the report
     */
    deleteSection: (key: string) => {
      updateReport({
        ...report,
        sections: report.sections.filter((section) => section.type !== key),
      })
    },
    summarizeSection: async (id: SectionType) => {
      const newText = await summarizeParagraph({
        paragraph: report.sections.find((s) => s.type === id)?.content ?? '',
      })

      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id) return section

          return {
            ...section,
            content: newText,
          }
        }),
      })
    },
    generateSection: async (id: SectionType) => {
      const section = await generateReport({ evaluation, sections: [id] })
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
    rephraseSelection: async (id: SectionType, selection: string, type: ActionTypes) => {
      const paragraph = report.sections.find((s) => s.type === id)?.content ?? ''
      const newText = await rephraseSelection({ paragraph, selection, type })

      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id) return section

          return {
            ...section,
            content: newText,
          }
        }),
      })
    },
  }
}
