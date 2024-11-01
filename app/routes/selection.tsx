import { Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'

import EvaluationPanel from '@/components/EvaluationPanel'
import Header from '@/components/Header'
import MainNav from '@/components/MainNav'
import MedicalRecord from '@/components/MedicalRecord'
import { useOpenAI } from '@/hooks/useOpenAI'

const defaultParagraph =
  'The dermoscopic image presents a well-defined lesion measuring less than 6 mm with a uniform color, indicating a consistent morphology. The borders of the lesion are sharp, suggesting a demarcated border indicative of a benign nature. There are no irregularities in color or texture observed, which is consistent with a stable and non-suspicious appearance.'

export const Route = createFileRoute('/selection')({
  component: () => (
    <div style={{ backgroundColor: 'var(--surface)' }}>
      <Header />

      <Flex>
        <MainNav />
        <MedicalRecord />

        <Flex direction="column" p="6" width="100%" gap="3">
          <EvaluationPanel />

          <Flex direction="column" gap="2">
            <Flex justify="end" gap="2">
              <Button variant="surface" onClick={() => {}}>
                Auto-generate
              </Button>

              {/* <Button onClick={() => rephrase('aa')}>TEST</Button> */}
              <Button>Approve</Button>
            </Flex>
            <Flex className="panel" direction="column" gap="4">
              <Selection />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  ),
})

function Selection() {
  const [selectedText, setSelectedText] = useState('')
  const [paragraph, setParagraph] = useState(defaultParagraph)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLButtonElement>(null)
  const { rephraseSelection } = useOpenAI()

  console.log('selectedText', selectedText)

  const updateMenuPosition = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      // Position the menu above the selection
      setMenuPosition({
        x: rect.x + rect.width / 2,
        y: rect.y - 10,
      })
    }
  }, [])

  const handleTextSelection = useCallback(
    (ev: SyntheticEvent<HTMLDivElement>) => {
      const selection = window.getSelection()
      const text = selection?.toString() || ''
      setSelectedText(text)

      if (text) {
        setIsMenuVisible(true)
        updateMenuPosition()
      } else {
        setIsMenuVisible(false)
      }
    },
    [updateMenuPosition],
  )

  const handleRephrase = async () => {
    const response = await rephraseSelection(selectedText, paragraph)
    console.log('>>', response)

    setParagraph(response)
    window.getSelection()?.removeAllRanges()

    setIsMenuVisible(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  // console.log('isMenuVisible', isMenuVisible, menuPosition)

  return (
    <div style={{ position: 'relative' }}>
      <div
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
        dangerouslySetInnerHTML={{ __html: paragraph }}></div>
      {/* <p>Selection: {selectedText}</p> */}
      <div
        ref={menuRef}
        // className="fixed z-50 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{
          zIndex: 50,
          position: 'fixed',
          overflow: 'hidden',
          top: 0,
          left: 0,
          transform: `translate(${menuPosition.x}px, ${menuPosition.y}px) translate(-50%, -100%)`,
        }}>
        <DropdownMenu.Root open={isMenuVisible}>
          <DropdownMenu.Trigger ref={ref}>
            <div></div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item onClick={handleRephrase}>Rephrase</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  )
}
