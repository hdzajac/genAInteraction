import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  createRootRoute,
  Outlet,
  redirect,
  ScrollRestoration,
  useRouter,
} from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { queryClient } from '@/router'

import '../global.css'

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'GenAI',
    },
  ],
  component: RootComponent,
  notFoundComponent: () => <div>Not found</div>,
})

function RootComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      setIsLoading(false)
      return
    }
    if (router.latestLocation.href !== '/login') {
      const token = localStorage.getItem('token')
      if (token) {
        setIsLoading(false)
      } else {
        throw redirect({ to: '/login' })
      }
    } else {
      setIsLoading(false)
    }
    setIsLoading(false)
  }, [])

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <Theme
          accentColor="jade"
          grayColor="gray"
          panelBackground="solid"
          hasBackground
          scaling="100%"
          radius="medium">
          {children}
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}
