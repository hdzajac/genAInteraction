import { Box, Button, CheckboxCards, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { EvaluationReport, VisualFeatures } from '@/store/types'
import { useRecord } from '@/store/useRecord'
import { TextArea } from './TextArea'
import { useEffect, useState } from 'react'




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

  const [query, setQuery] = useState('')
  const [filteredFeatures, setFilteredFeatures] = useState<VisualFeatures[]>([])

  const cardFeatures = defaultEvaluation.visualFeatures

  useEffect(() => {
    const filtered = cardFeatures.filter(feature => 
      feature.cardname.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredFeatures(filtered)
  }, [query, cardFeatures])

  
  

    

  



  

  return (
    <Flex className="panel" direction="column">
      <Heading as="h2" mb="4">
        Evaluation overview
      </Heading>


      
      
      <form onSubmit={handleSubmit(handleSave)}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Visual features
            </Text>
          </label>

          <TextField.Root placeholder="Search for features" 
                          value={query} 
                          onChange={(e) => setQuery(e.target.value)}>
            <TextField.Slot>
              
            </TextField.Slot>
          </TextField.Root>
          
        
          <CheckboxCards.Root>
            {filteredFeatures.map((feature) => (
              <CheckboxCards.Item
                key={feature.cardname}
                value={feature.cardname}>
                <Text>{feature.cardname}</Text>
              </CheckboxCards.Item>
            ))}
          </CheckboxCards.Root>
            
          








          
          
        
          
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
            <TextArea {...register("treatment")}/>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Alternative plan
            </Text>
            <TextArea {...register("alternativePlan")}/>
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
