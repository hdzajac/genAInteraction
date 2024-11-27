import { Button, Dialog, Flex, RadioGroup, Switch, Text } from '@radix-ui/themes'
import { Settings } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { useFlags } from './useFlags'

type Props = {}

export default function FeatureFlagPanel({}: Props) {
  const { update, flags } = useFlags()

  const { register, handleSubmit, control } = useForm({
    defaultValues: flags,
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost">
          <Settings size={20} color="white" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" aria-describedby={undefined}>
        <Dialog.Title>Feature flags</Dialog.Title>

        <form onSubmit={handleSubmit(update)}>
          <Flex direction="column" gap="5">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Alternatives selection
              </Text>
              <Controller
                name="showAlternatives"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <RadioGroup.Root {...field} onValueChange={onChange}>
                    <RadioGroup.Item value="1">From dropdown menu</RadioGroup.Item>
                    <RadioGroup.Item value="2">Click on paragraph</RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Include patient data
              </Text>
              <Controller
                name="usePatientData"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Switch variant="surface" checked={value} onCheckedChange={onChange} />
                )}
              />
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
  )
}
