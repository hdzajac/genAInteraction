import { Flex } from '@radix-ui/themes'
import { useRouter } from '@tanstack/react-router'

import './Header.css'

export default function Header() {
  const router = useRouter()

  return (
    <Flex className="header" align="center" p="2">
      <Flex align="center" className="header-nav" gap="2">
        <svg
          width="45"
          height="46"
          viewBox="0 0 45 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect y="0.5" width="45" height="45" rx="2.36842" fill="#282625" />
          <path
            d="M2.36842 1.09211H42.6316C43.6126 1.09211 44.4079 1.88739 44.4079 2.86842V43.1316C44.4079 44.1126 43.6126 44.9079 42.6316 44.9079H2.36842C1.38739 44.9079 0.592105 44.1126 0.592105 43.1316V2.86842C0.592105 1.88739 1.38739 1.09211 2.36842 1.09211Z"
            fill="#282625"
            stroke="#BFBFBF"
            strokeWidth="1.18421"
          />
          <path d="M10.0349 29.1356V32.8252H34.032V29.1356H10.0349Z" fill="white" />
          <path d="M12.8717 21.3773V25.0669H31.1961V21.3773H12.8717Z" fill="white" />
          <path d="M12.8715 24.2129H16.7808V13.9191H12.8715L12.8715 24.2129Z" fill="white" />
          <path d="M27.2864 24.2129H31.1957V14.1744H27.2864V24.2129Z" fill="white" />
          <path
            d="M12.8717 12.8271V14.1744H31.1961V12.8271L28.7143 10.52H15.3535L12.8717 12.8271Z"
            fill="white"
          />
        </svg>

        <span>Cases</span>
        <span>Tele-referal</span>
      </Flex>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem('token')
          router.navigate({ to: '/login' })
        }}>
        Logout
      </button>
    </Flex>
  )
}
