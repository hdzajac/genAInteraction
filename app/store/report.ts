import { create } from 'zustand'

import { Report } from '@/components/useReport'

type ReportState = {
  report: Report
  updateReport(report: Report): void
}

const defaultReport: Report = {
  date: new Date(),
  author: 'Dr. John Doe',
  sections: [
    {
      type: 'VISUAL_DESCRIPTION',
      content: '',
    },
    {
      type: 'ASSESSMENT',
      content: '',
    },
    {
      type: 'PRIMARY_PLAN',
      content: '',
    },
    {
      type: 'ALTERNATIVE_PLAN',
      content: '',
    },
  ],
}

export const useReportStore = create<ReportState>((set) => ({
  report: defaultReport,
  updateReport(report: Report) {
    set((state) => ({
      report: report,
    }))
  },
}))
