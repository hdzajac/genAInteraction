import { Flex } from '@radix-ui/themes'
import { useEditor } from '@tiptap/react'
import { Mic, MicOff } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  editor: ReturnType<typeof useEditor>
}

export default function Dictation({ editor }: Props) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return // No window, or no content to add to - do not initiate the speech recognition.
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.error('Speech Recognition API is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1]

      if (lastResult.isFinal) {
        let transcript = lastResult[0].transcript
        if (editor) {
          const { from } = editor.state.selection

          const past = editor.state.doc.textBetween(0, from, ' ')
          if (isFullSentence(past)) {
            transcript = capitalizeFirstLetter(transcript)
          }

          editor.chain().focus().insertContentAt(from, transcript).run()
        }
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error)
      setIsListening(false)
    }

    setRecognition(recognition)

    // Cleanup Function:
    return () => {
      if (recognition) {
        recognition.stop() // Stop the Speech recog when the component unmounts.
      }
    }
  }, [])

  const toggleDictation = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      editor?.chain().insertContent(' ').focus().run()
      setIsListening(true)
    }
  }

  return (
    <Flex
      style={{ zIndex: 1000 }}
      gap="1"
      position="absolute"
      top="3"
      right="3"
      align="center"
      className="ContentEditor-dictate"
      data-dictate={isListening ? 'true' : 'false'}
      onClick={toggleDictation}>
      {isListening ? <Mic size={14} /> : <MicOff size={14} />}
      {isListening ? 'Stop Dictation' : 'Dictate'}
    </Flex>
  )
}

function isFullSentence(text: string) {
  if (!text || text.trim().length === 0) {
    return false // Empty or whitespace-only string is not a sentence
  }

  text = text.trim()

  // Check if it ends with a sentence terminator (. ! ?)
  if (!/[.?!]$/.test(text)) {
    return false
  }

  //Check if the sentence is just a punctuation mark
  if (text.length === 1) {
    return false
  }

  // Check if the first character is uppercase or a number
  if (!/^[A-Z0-9'"‘“]/.test(text[0])) {
    //Added quotes to allowed first characters
    return false
  }

  return true
}

function capitalizeFirstLetter(str: string) {
  if (!str || str.length === 0) {
    return str // Return empty string if input is empty or null
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}
