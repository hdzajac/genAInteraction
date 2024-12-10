import { Button, Dialog, Flex, Spinner } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

import { useOpenAI } from '@/hooks/useOpenAI'
import { cleanContent } from '@/utils'
import { Alternative } from '../useReport'

type AlternativesProps = {
  onPickAlternative: (alternative: string) => void
}

export default function AlternativeSelection({ onPickAlternative }: AlternativesProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="ContentEditor-bubbleItem">Alternatives</div>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="800px" aria-describedby={undefined}>
        <Flex align="center" justify="between">
          <Dialog.Title>Alternatives</Dialog.Title>
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>

        <Content onPickAlternative={onPickAlternative} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

function Content({ onPickAlternative }: AlternativesProps) {
  const { getAlternatives } = useOpenAI()
  const [isLoading, setIsLoading] = useState(false)
  const [alternatives, setAlternatives] = useState<Alternative[]>([])

  useEffect(() => {
    handleShowAlternatives()
  }, [])

  const handleShowAlternatives = async () => {
    const alternatives = await getAlternatives({ paragraph: cleanContent('original content') })
    setIsLoading(true)

    setAlternatives(alternatives)
    setIsLoading(false)
  }

  if (isLoading || !alternatives) {
    return <Spinner />
  }

  return (
    <Flex direction="column" gap="2">
      {alternatives.map((alternative, index) => (
        <div key={index}>
          <Flex gap="2" align="start" direction="column" className="ReportSection-alt">
            {alternative.content}
            <Dialog.Close>
              <Button variant="soft" onClick={() => onPickAlternative(alternative.content)}>
                Pick this version
              </Button>
            </Dialog.Close>
          </Flex>
        </div>
      ))}
    </Flex>
  )
}
