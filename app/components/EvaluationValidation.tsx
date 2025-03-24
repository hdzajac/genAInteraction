import { Box, Button, CheckboxCards, Flex, Heading, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'

import { EvaluationReport } from '@/store/types'
import { useRecord } from '@/store/useRecord'
import { TextArea } from './TextArea'
import React,{ useState } from 'react'

type Props = {
  defaultEvaluation: EvaluationReport
  onSave: () => void
}

export default function EvaluationValidation({ defaultEvaluation, onSave }: Props) {
  const { updateEvaluation } = useRecord()

  const { register, handleSubmit } = useForm({
    defaultValues: defaultEvaluation,
  })

  const handleSave = (formData: EvaluationReport) => {
    updateEvaluation(formData)
    onSave()
  }


  // States for checkboxcards - Either shown or not shown
  const [isBlueChecked, setIsBlueChecked] = useState(false); 
  const [isRedChecked, setIsRedChecked] = useState(false);
  const [isGreenChecked, setIsGreenChecked] = useState(false);

  const handleBlueCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBlueChecked(event.target.checked); 
  }
  const handleRedCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRedChecked(event.target.checked); 
  }
  const handleGreenCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGreenChecked(event.target.checked); 
  }

  

  return (
    <Flex className="panel" direction="column">
      <Heading as="h2" mb="4">
        Evaluation overview
      </Heading>
      
      <form onSubmit={handleSubmit(handleSave)}>
        <Flex direction="column" gap="3">
        
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Visual features - Seborrheic keratosis
            </Text>
            <input
              type='checkbox'
              checked={isBlueChecked}
              onChange={handleBlueCheckboxChange}
            />
          </label>
          {isBlueChecked && (
            <>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='1'>
             <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Globules with hairpin vessels and white halos</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Brain-like pattern (soft surface)</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Brain-like pattern (rocky surface)</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Dot-like crusts (from perforated hairpin vessels)</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Absence of pigment patterns</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Yellowish-gray color</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Sharp border</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Pattern of dark pigmented rings</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Homogeneous brown color with sharp borders</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Moth-eaten edges</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Dark globules with white halos</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Globules with white halos</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Fingerprint-like pattern</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Comedo-like openings</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Milia-like cysts</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Hyperkeratosis</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Hairpin vessels</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Fat finger</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          </>
          )}
        


          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Visual features - Unspecified Nevus
            </Text>
            <input
              type='checkbox'
              checked={isRedChecked}
              onChange={handleRedCheckboxChange}
            />
          </label>
          {isRedChecked && (
            <>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='red' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Black/brown regular dots</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Overall uniform pigment pattern throughout the lesion</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Globules</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='red' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Reticular pigment pattern</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Cobblestone pigment pattern</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Regularly distributed peripheral globules around the lesion</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='red' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Homogeneous pigment pattern</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Pseudonetwork</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Homogeneous blue</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='red' size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Reticular pigment pattern with white holes</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Lobulated surface</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Comma-shaped violet vessels</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          </>
          )}

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Visual features - Dermal Nevus
            </Text>
            <input
              type='checkbox'
              checked={isGreenChecked}
              onChange={handleGreenCheckboxChange}
            />
          </label>

          {isGreenChecked && (
            <>
          <Box maxWidth="700px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} size='1'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='green'>Cobblestone pigment pattern</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="2">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='green'>Lobulated surface</Text>
                </Flex>
              </CheckboxCards.Item>
              <CheckboxCards.Item value="3">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='green'>Comma-shaped violet vessels</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          </>
          )}
        
          
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Diagnosis
            </Text>
          </label>
          <Box maxWidth="800px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='blue' size='2'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='blue'>Seborrheic keratosis</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="800px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='red' size='2'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='red'>Unspecified Nevus</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
          <Box maxWidth="800px">
            <CheckboxCards.Root columns={{ initial: "3", sm: "3" }} color='green' size='2'>
              <CheckboxCards.Item value="1">
                <Flex direction="column" width="100%">
                  <Text weight="bold" color='green'>Dermal nevus</Text>
                </Flex>
              </CheckboxCards.Item>
            </CheckboxCards.Root>
          </Box>
        
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Treatment plan
            </Text>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Alternative plan
            </Text>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Follow up
            </Text>
            <TextArea {...register('followUp')} />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="start">
          <Button type="submit">Approve diagnosis</Button>
        </Flex>
      </form>
    </Flex>
  )
}
