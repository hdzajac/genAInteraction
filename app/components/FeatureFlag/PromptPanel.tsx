import { Flex, Grid, RadioGroup, Select, Switch, Text, TextField } from '@radix-ui/themes'
import { Control, Controller } from 'react-hook-form'

import { Flags } from './useFlags'
import { TextArea } from '../TextArea'
import systemPrompt from '@/prompt-generators/helpers/system-prompt'

type Props = {
  control: Control<Flags>
}

export default function PromptPanel({ control }: Props) {
  return (
    <Flex direction="column" gap="5">
      <Grid gap="3" columns="1fr 1fr">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Model
          </Text>

          <Controller
            name="model"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select.Root defaultValue={value ?? 'gpt-4o-mini'} onValueChange={onChange}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="gpt-4o-mini">gpt-4o-mini</Select.Item>
                  <Select.Item value="gpt-4o">gpt-4o</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Temperature
          </Text>
          <Controller
            name="temperature"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField.Root size="1" value={value} onChange={onChange} />
            )}
          />
        </label>
      </Grid>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          System prompt
        </Text>
        <Controller
          name="systemPrompt"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea size="1" value={value} onChange={onChange} placeholder={systemPrompt} />
          )}
        />
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
