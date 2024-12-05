import { Button, Flex, Heading, Text } from '@radix-ui/themes'
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
