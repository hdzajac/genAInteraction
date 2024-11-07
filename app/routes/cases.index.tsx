import { Flex } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import * as fs from 'node:fs'
import path from 'node:path'

import Header from '@/components/Header'

export const getRecords = createServerFn('GET', async () => {
  const files = await fs.promises.readdir('./app/data/cases/', 'utf-8').catch(() => [])
  const cases: any[] = []

  for await (const file of files) {
    try {
      const data = await fs.promises.readFile(path.join('./app/data/cases/', file), 'utf-8')
      cases.push(JSON.parse(data))
    } catch (error) {
      console.log('error', error)
    }
  }

  return cases
})

export const Route = createFileRoute('/cases/')({
  loader: async () => getRecords(),
  component: RouteComponent,
})

function RouteComponent() {
  const records = Route.useLoaderData()

  return (
    <Flex style={{ backgroundColor: 'var(--surface)' }} height="100vh" direction="column">
      <Header />
      <Flex direction="column" p="4">
        {records?.length > 0 ? (
          <Flex width="100%" gap="4" direction="column">
            {records.map((medCase, index) => (
              <Link
                style={{ display: 'block', textDecoration: 'none', color: 'var(--gray-12)' }}
                key={index}
                className="panel"
                to="/cases/$caseId"
                params={{ caseId: medCase.id }}>
                Case {medCase.id}
              </Link>
            ))}
          </Flex>
        ) : (
          <p>No cases found</p>
        )}
      </Flex>
    </Flex>
  )
}
