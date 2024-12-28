import { Flex, RadioGroup, Select, Switch, Text } from '@radix-ui/themes'
import { Control, Controller } from 'react-hook-form'

import { Flags } from './useFlags'

type Props = {
  control: Control<Flags>
}

export default function InterfacePanel({ control }: Props) {
  return (
    <Flex direction="column" gap="5">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Stream data
        </Text>

        <Controller
          name="streamData"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch variant="surface" checked={value} onCheckedChange={onChange} />
          )}
        />
      </label>
    </Flex>
  )
}
