import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

import { token, password } from '@/auth'

export const loginFn = createServerFn(
  'POST',
  async (
    payload: {
      password: string
    },
    { request },
  ) => {
    if (payload.password !== password) {
      return {
        error: true,
        message: 'Incorrect password',
      }
    }

    return {
      token: token,
    }
  },
)

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (response) => {
      if (response.token) {
        localStorage.setItem('token', response.token)
        router.navigate({ to: '/' })
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        loginMutation.mutate({
          password: formData.get('password') as string,
        })
      }}
      className="space-y-4">
      <Flex align="center" justify="center" direction="column" height="100vh">
        <Box width="250px">
          <Flex direction="column" gap="2">
            <TextField.Root name="password" type="password" size="1" placeholder="Enter password" />

            <Button type="submit">Login</Button>

            {loginMutation.data?.message && <Text color="red">{loginMutation.data?.message}</Text>}
          </Flex>
        </Box>
      </Flex>
    </form>
  )
}
