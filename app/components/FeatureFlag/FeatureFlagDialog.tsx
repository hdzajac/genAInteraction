import { Box, Button, Dialog, Flex, Tabs } from '@radix-ui/themes'
import { Settings } from 'lucide-react'
import { useForm } from 'react-hook-form'

import InterfacePanel from './InterfacePanel'
import PromptPanel from './PromptPanel'
import { useFlags } from './useFlags'

type Props = {}

export default function FeatureFlagDialog({}: Props) {
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
          <Tabs.Root defaultValue="prompt">
            <Tabs.List>
              <Tabs.Trigger value="prompt">Prompt</Tabs.Trigger>
              <Tabs.Trigger value="ui">UI</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              <Tabs.Content value="prompt">
                <PromptPanel control={control} />
              </Tabs.Content>

              <Tabs.Content value="ui">
                <InterfacePanel control={control} />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
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
