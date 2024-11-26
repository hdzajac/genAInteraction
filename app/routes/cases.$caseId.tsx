import { Flex, Grid, Spinner } from '@radix-ui/themes'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import * as fs from 'node:fs'

import EvaluationPanel from '@/components/EvaluationPanel'
import Header from '@/components/Header'
import MainNav from '@/components/MainNav'
import MedicalRecord from '@/components/MedicalRecord'
import ReportPreview from '@/components/ReportPreview'
import { MedicalRecord as TMedicalRecord } from '@/store/types'
import { useEffect, useState } from 'react'
import { useEvaluationStore } from '@/store/evaluation'
import { useReportStore } from '@/store/report'
import EvaluationValidation from '@/components/EvaluationValidation'

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const data = await fs.promises.readFile(
      process.cwd() + `/app/data/cases/${params.caseId}.json`,
      'utf8'
    )
    return JSON.parse(data)
  } catch (error) {
    console.log('error', error)
  }
}

export default function Case() {
  const record = useLoaderData() as TMedicalRecord
  const { evaluation, updateEvaluation } = useEvaluationStore()
  const { reset } = useReportStore()
  const [loading, setLoading] = useState(true)
  const [isValid, setValidation] = useState(false)

  if (!record) return null

  useEffect(() => {
    updateEvaluation(record.evaluation)

    setLoading(false)

    reset()
  }, [])

  if (loading) {
    return <Spinner />
  }

  const handleSave = () => {
    setValidation(true)
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)' }}>
      <Header />

      <Grid columns=" 2fr 3fr">
        {/* <MainNav record={record} /> */}

        <MedicalRecord record={record} />

        <Flex direction="column" p="6" width="100%" gap="3">
          {isValid ? (
            <>
              <EvaluationPanel defaultEvaluation={evaluation} />
              <ReportPreview />
            </>
          ) : (
            <EvaluationValidation defaultEvaluation={evaluation} onSave={handleSave} />
          )}
        </Flex>
      </Grid>
    </div>
  )
}
