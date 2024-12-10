import { create } from 'zustand'

import { Report } from '@/components/useReport'

type ReportState = {
  report: Report
  updateReport(report: Report): void
  reset(): void
}

const defaultReport: Report = {
  date: new Date(),
  author: 'Dr. John Doe',
  content: '',
}

export const useReportStore = create<ReportState>((set) => ({
  report: defaultReport,
  updateReport(report: Report) {
    set((state) => ({
      report: report,
    }))
  },
  reset() {
    set({ report: defaultReport })
  },
}))
