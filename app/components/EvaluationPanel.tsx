import { Button, Dialog, Flex, Heading, Text, TextArea } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'

import { useEvaluationStore } from '@/store/evaluation'
import { EvaluationReport } from '@/store/types'

type Props = {
  defaultEvaluation: EvaluationReport
}

export default function EvaluationPanel({ defaultEvaluation }: Props) {
  const { evaluation, updateEvaluation } = useEvaluationStore()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultEvaluation,
  })

  const handleCancel = () => {
    reset(defaultEvaluation)
  }

  return (
    <div className="panel">
      <Flex justify="between" align="center" mb="4">
        <Heading as="h2">Evaluation overview</Heading>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button size="1" variant="outline">
              Edit evaluation
            </Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="800px" aria-describedby={undefined}>
            <Dialog.Title>Edit evaluation</Dialog.Title>
            <form onSubmit={handleSubmit(updateEvaluation)}>
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

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button type="submit">Save</Button>
                </Dialog.Close>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      <Flex gap="4" direction="column">
        <div>
          <Heading as="h4" size="2">
            Visual features
          </Heading>
          <Text as="p" size="2">
            {displayValue(evaluation.visualFeatures)}
          </Text>
        </div>
        <div>
          <Heading as="h4" size="2">
            Diagnosis
          </Heading>
          <Text as="p" size="2">
            {displayValue(evaluation.diagnosis)}
          </Text>
        </div>
        <div>
          <Heading as="h4" size="2">
            Treatment plan
          </Heading>
          <Text as="p" size="2">
            {displayValue(evaluation.treatment)}
          </Text>
        </div>
        <div>
          <Heading as="h4" size="2">
            Alternative plan
          </Heading>
          <Text as="p" size="2">
            {displayValue(evaluation.alternativePlan)}
          </Text>
        </div>
        <div>
          <Heading as="h4" size="2">
            Follow up
          </Heading>
          <Text as="p" size="2">
            {displayValue(evaluation.followUp)}
          </Text>
        </div>
      </Flex>
    </div>
  )
}

function displayValue(value: string) {
  if (value === '') {
    return 'NA'
  }

  return value
}
