import { Flex } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

import EvaluationPanel from '@/components/EvaluationPanel'
import Header from '@/components/Header'
import MainNav from '@/components/MainNav'
import MedicalRecord from '@/components/MedicalRecord'
import ReportPreview from '@/components/ReportPreview'

export const Route = createFileRoute('/')({
  component: () => (
    <div style={{ backgroundColor: 'var(--surface)' }}>
      <Header />

      <Flex>
        <MainNav />
        <MedicalRecord />

        <Flex direction="column" p="6" width="100%" gap="3">
          <EvaluationPanel />

          <ReportPreview />
        </Flex>
      </Flex>
    </div>
  ),
})
