import { useEvaluationStore } from '@/store/evaluation'
import {
  Button,
  Dialog,
  Flex,
  Heading,
  RadioGroup,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'

export default function EvaluationPanel() {
  const { evaluation, updateEvaluation } = useEvaluationStore()

  const { register, handleSubmit, control } = useForm({
    defaultValues: evaluation,
  })

  const onSubmit = (formData: typeof evaluation) => {
    updateEvaluation(formData)
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

          <Dialog.Content maxWidth="800px">
            <Dialog.Title>Edit evaluation</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Make changes to your profile.
            </Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Diagnosis
                  </Text>
                  <TextField.Root {...register('diagnosis')} />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Treatment
                  </Text>
                  <TextField.Root {...register('treatment')} />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Image quality
                  </Text>

                  <Controller
                    name="imageQuality"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <RadioGroup.Root {...field} onValueChange={onChange}>
                        <RadioGroup.Item value="Undiagnosable">Undiagnosable</RadioGroup.Item>
                        <RadioGroup.Item value="Good">Good</RadioGroup.Item>
                        <RadioGroup.Item value="Bad">Bad</RadioGroup.Item>
                      </RadioGroup.Root>
                    )}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Visual features
                  </Text>
                  <TextArea {...register('visualFeatures')} />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Educational comments
                  </Text>
                  <TextArea {...register('educationalComments')} />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
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

      <Flex gap="4">
        <Flex direction="column" gap="2" minWidth="200px">
          <div>
            <Heading as="h4" size="2">
              Diagnosis
            </Heading>
            <Text as="p" size="2">
              {evaluation.diagnosis}
            </Text>
          </div>
          <div>
            <Heading as="h4" size="2">
              Treatment
            </Heading>
            <Text as="p" size="2">
              {evaluation.treatment}
            </Text>
          </div>
          <div>
            <Heading as="h4" size="2">
              Image Quality
            </Heading>
            <Text as="p" size="2">
              {evaluation.imageQuality}
            </Text>
          </div>
        </Flex>
        <Flex direction="column" gap="2">
          <div>
            <Heading as="h4" size="2">
              Visual features
            </Heading>
            <Text as="p" size="2">
              {evaluation.visualFeatures}
            </Text>
          </div>
          <div>
            <Heading as="h4" size="2">
              Educational comments
            </Heading>
            <Text as="p" size="2">
              {evaluation.educationalComments}
            </Text>
          </div>
        </Flex>
      </Flex>
    </div>
  )
}
