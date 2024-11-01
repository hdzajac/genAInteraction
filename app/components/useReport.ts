import { useState } from 'react'
import { z } from 'zod'

import { useOpenAI } from '@/hooks/useOpenAI'
import { useEvaluationStore } from '../store/evaluation'
import { useReportStore } from '../store/report'

export const SectionType = z.enum([
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
  type: z.infer<typeof SectionType>
  content: string
}

type ParagraphId = {
  section: string
  index: number
}

export function useReport() {
  const { report, updateReport } = useReportStore()
  const { evaluation } = useEvaluationStore()
  const { generateReport, summarizeParagraph } = useOpenAI()
  const [isLoading, setIsLoading] = useState(false)

  return {
    isLoading,
    report,
    /**
     * Create a report based on the evaluation
     */
    createReport: async () => {
      setIsLoading(true)

      const sections = report.sections.map((section) => section.type)
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
    /**
     * Deletes a paragraph from a section
     */
    deleteParagraph: (id: ParagraphId) => {
      if (!report) return

      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id.section) return section

          return {
            ...section,
          }
        }),
      })
    },
    summarizeParagraph: async (id: ParagraphId, paragraph) => {
      const newText = await summarizeParagraph(paragraph)

      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id.section) return section

          return {
            ...section,
            content: newText,
          }
        }),
      })
    },
    pickAlternative: (id: ParagraphId, alternative: Array<{ sentences: string[] }>) => {
      if (!report) return

      console.log('alternative', report, alternative, id)

      updateReport({
        ...report,
        sections: report.sections.map((section) => {
          if (section.type !== id.section) return section

          return {
            ...section,
            content: alternative.sentences.join(' '),
          }
        }),
      })
    },
  }
}
