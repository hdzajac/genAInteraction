import { Flex, Grid, Spinner } from '@radix-ui/themes'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import * as fs from 'node:fs'
import path from 'node:path'

import EvaluationPanel from '@/components/EvaluationPanel'
import Header from '@/components/Header'
import MainNav from '@/components/MainNav'
import MedicalRecord from '@/components/MedicalRecord'
import ReportPreview from '@/components/ReportPreview'
import { MedicalRecord as TMedicalRecord } from '@/store/types'
import { useEffect, useState } from 'react'
import { useEvaluationStore } from '@/store/evaluation'

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const data = await fs.promises.readFile(
      path.join('./app/data/cases/', params.caseId + '.json'),
      'utf-8'
    )
    return JSON.parse(data)
  } catch (error) {
    console.log('error', error)
  }
}

export default function Case() {
  const record = useLoaderData() as TMedicalRecord
  const { evaluation, updateEvaluation } = useEvaluationStore()
  const [loading, setLoading] = useState(true)

  if (!record) return null

  useEffect(() => {
    updateEvaluation(record.evaluation)

    setLoading(false)
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)' }}>
      <Header />

      <Grid columns="200px 2fr 3fr">
        <MainNav record={record} />

        <MedicalRecord record={record} />

        <Flex direction="column" p="6" width="100%" gap="3">
          <EvaluationPanel defaultEvaluation={evaluation} />

          <ReportPreview />
        </Flex>
      </Grid>
    </div>
  )
}
