import { Button, DropdownMenu, Flex, Spinner, TextArea } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useOpenAI } from '@/hooks/useOpenAI'
import { useReport } from '@/components/useReport'
import './ReportParagraph.css'

type Props = {
  paragraph: any
  id: {
    section: string
    index: number
  }
}

export default function ReportParagraph({ paragraph, id }: Props) {
  const { deleteParagraph, summarizeParagraph, pickAlternative } = useReport()
  const { getAlternatives } = useOpenAI()
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [tempParagraph, setParagraph] = useState(paragraph)

  const { data: alternatives, isLoading } = useQuery({
    queryKey: ['alternatives', paragraph],
    queryFn: () => getAlternatives(paragraph),
    enabled: showAlternatives,
  })

  const handlePick = (alternative: any) => {
    console.log('PICK', alternative)
    pickAlternative(id, alternative)

    setShowAlternatives(false)
  }

  return (
    <Flex direction="column" gap="2" position="relative">
      <Flex className="ReportParagraph" align="start">
        <div>{paragraph}</div>
        <DropdownMenuBtn
          handleDelete={() => deleteParagraph(id)}
          summarize={() => summarizeParagraph(id, paragraph)}
          showAlternatives={async () => {
            setShowAlternatives(true)
          }}
        />
      </Flex>
      {isLoading && (
        <Flex
          position="absolute"
          justify="center"
          align="center"
          top="0"
          left="0"
          right="0"
          bottom="0"
          style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <Spinner />
        </Flex>
      )}

      {alternatives && (
        <AlternativesSelection alternatives={alternatives} pickAlternative={handlePick} />
      )}
    </Flex>
  )
}

const DropdownMenuBtn = ({ handleDelete, summarize, showAlternatives }) => {
  return (
    <Flex
      gap="3"
      align="center"
      right="3"
      top="2"
      position="absolute"
      className="ReportParagraph-dropdown">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" size="1">
            ...
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="1">
          <DropdownMenu.Item onClick={summarize}>Summarize</DropdownMenu.Item>
          <DropdownMenu.Item onClick={showAlternatives}>Show alternatives</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red" onClick={handleDelete}>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}

function AlternativesSelection({ alternatives, pickAlternative }: Props) {
  return (
    <Flex direction="column" gap="2">
      {alternatives?.map((alternative, index) => (
        <div key={index}>
          <Flex gap="2" align="start" direction="column" className="ReportParagraph-alt">
            {alternative?.sentences.map((sentence, index) => <span key={index}> {sentence}</span>)}
            <Button variant="soft" onClick={() => pickAlternative(alternative)}>
              Pick this version
            </Button>
          </Flex>
        </div>
      ))}
    </Flex>
  )
}
