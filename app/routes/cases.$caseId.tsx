import { Flex, Grid, Spinner } from '@radix-ui/themes'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import * as fs from 'node:fs'

import EvaluationPanel from '@/components/EvaluationPanel'
import EvaluationValidation from '@/components/EvaluationValidation'
import Header from '@/components/Header'
import MedicalRecord from '@/components/MedicalRecord'
import ReportPreview from '@/components/ReportPreview'
import { useReportStore } from '@/store/report'
import { MedicalRecord as TMedicalRecord } from '@/store/types'
import { useRecord } from '@/store/useRecord'
import { useEffect, useState } from 'react'

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
  const defaultRecord = useLoaderData() as TMedicalRecord
  const { record, updateRecord } = useRecord()
  const { reset } = useReportStore()
  const [loading, setLoading] = useState(true)
  const [isValid, setValidation] = useState(false)

  if (!defaultRecord) return null

  useEffect(() => {
    updateRecord(defaultRecord)

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
              <EvaluationPanel defaultEvaluation={record.evaluation} />
              <ReportPreview />
            </>
          ) : (
            <EvaluationValidation defaultEvaluation={record.evaluation} onSave={handleSave} />
          )}
        </Flex>
      </Grid>
    </div>
  )
}
