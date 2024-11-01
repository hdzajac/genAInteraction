import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../global.css'
import { queryClient } from '@/router'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
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
  notFoundComponent: () => <div>No found</div>,
})

function RootComponent() {
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
