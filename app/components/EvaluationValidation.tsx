import { Box, Button, CheckboxCards, Flex, Heading, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'

import { EvaluationReport } from '@/store/types'
import { useRecord } from '@/store/useRecord'
import { TextArea } from './TextArea'

type Props = {
  defaultEvaluation: EvaluationReport
  onSave: () => void
}

export default function EvaluationValidation({ defaultEvaluation, onSave }: Props) {
  const { updateEvaluation } = useRecord()

  const { register, handleSubmit } = useForm({
    defaultValues: defaultEvaluation,
  })

  const handleSave = (formData: EvaluationReport) => {
    updateEvaluation(formData)

    onSave()
  }

  return (
    <Flex className="panel" direction="column">
      <Box maxWidth="600px">
        <CheckboxCards.Root defaultValue={["1"]} columns={{ initial: "1", sm: "3" }}>
          <CheckboxCards.Item value="1">
            <Flex direction="column" width="100%">
              <Text weight="bold" color='brown'>A1 Keyboard</Text>
              <Text>US Layout</Text>
            </Flex>
          </CheckboxCards.Item>
          <CheckboxCards.Item value="2">
            <Flex direction="column" width="100%">
              <Text weight="bold">Pro Mouse</Text>
              <Text>Zero-lag wireless</Text>
            </Flex>
          </CheckboxCards.Item>
          <CheckboxCards.Item value="3">
            <Flex direction="column" width="100%">
              <Text weight="bold">Lightning Mat</Text>
              <Text>Wireless charging</Text>
            </Flex>
          </CheckboxCards.Item>
        </CheckboxCards.Root>
        </Box>
      <Heading as="h2" mb="4">
        Evaluation overview
      </Heading>
      <form onSubmit={handleSubmit(handleSave)}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Visual features
            </Text>
            <TextArea {...register('visualFeatures')} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Diagnosis
            </Text>
            <TextArea {...register('diagnosis')} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Treatment plan
            </Text>
            <TextArea {...register('treatment')} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Alternative plan
            </Text>
            <TextArea {...register('alternativePlan')} />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Follow up
            </Text>
            <TextArea {...register('followUp')} />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="start">
          <Button type="submit">Approve diagnosis</Button>
        </Flex>
      </form>
    </Flex>
  )
}
