import { Flex, RadioGroup, Select, Switch, Text } from '@radix-ui/themes'
import { Control, Controller } from 'react-hook-form'

import { Flags } from './useFlags'

type Props = {
  control: Control<Flags>
}

export default function PromptPanel({ control }: Props) {
  return (
    <Flex direction="column" gap="5">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Model
        </Text>

        <Select.Root defaultValue="gpt-4o-mini">
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="gpt-4o-mini">gpt-4o-mini</Select.Item>
            <Select.Item value="gpt-4o">gpt-4o</Select.Item>
          </Select.Content>
        </Select.Root>
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Include medical record
        </Text>
        <Controller
          name="usePatientData"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch variant="surface" checked={value} onCheckedChange={onChange} />
          )}
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Include examples in prompt
        </Text>
        <Controller
          name="includeExamplesInPrompts"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch variant="surface" checked={value} onCheckedChange={onChange} />
          )}
        />
      </label>
    </Flex>
  )
}
