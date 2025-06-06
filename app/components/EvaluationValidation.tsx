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
    const selectedFeatures = filteredFeatures.filter(feature =>
      selectedCardnames.includes(feature.cardname)
    )
    const selectedDiag = cardDiagnosis.filter(diag =>
      selectedDiagnosis.includes(diag.cardname)
    )
    const selectedTreat = cardTreatment.filter(treat =>
      selectedPlan.includes(treat.cardname)
    )
    const selectedAltTreat = cardAltTreatment.filter(altTreat =>
      selectedAltPlan.includes(altTreat.cardname)
    )
    const selectedFolTreat = cardFolTreatment.filter(fol =>
      selectedFolPlan.includes(fol.cardname)
    )
    
    
    const updatedEvaluation: EvaluationReport = {
      ...formData,
      visualFeatures: selectedFeatures,
      diagnosis: selectedDiag,
      treatment: selectedTreat,
      alternativePlan: selectedAltTreat,
      followUp: selectedFolTreat,
    }
    updateEvaluation(updatedEvaluation)
    onSave()
  }

  const [query, setQuery] = useState('');
  const [filteredFeatures, setFilteredFeatures] = useState<VisualFeatures[]>([]);
  
  const [selectedCardnames, setSelectedCardnames] = useState<string[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedAltPlan, setSelectedAltPlan] = useState<string[]>([]);
  const [selectedFolPlan, setSelectedFolPlan] = useState<string[]>([]);
  
  const cardDiagnosis = defaultEvaluation.diagnosis;
  const cardTreatment = defaultEvaluation.treatment;
  const cardAltTreatment = defaultEvaluation.alternativePlan;
  const cardFolTreatment = defaultEvaluation.followUp;


  const [newFeature, setNewFeature] = useState('')
  const [features, setFeatures] = useState<VisualFeatures[]>(defaultEvaluation.visualFeatures)

  const addCard = () => {
    const trimmed = newFeature.trim()
    if (!trimmed) return

    const exists = features.some(f => f.cardname.toLowerCase() === trimmed.toLowerCase())
    if (exists) {
      alert ("Feature already exists")
      return
    }

    const newEntry: VisualFeatures = {
      cardname: trimmed,
      smartphrase: ""
    }

    const updated = [...features, newEntry]
    setFeatures(updated)
    setFilteredFeatures(updated)
    setNewFeature("")
  }

  useEffect(() => {
    const filtered = features.filter(feature => 
      feature.cardname.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredFeatures(filtered)
  }, [query, features])
  


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
            <Flex gap="2" mb="3">
              <TextField.Root
                placeholder="Add new feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}>
              </TextField.Root>
              
              <Button type="button" onClick={addCard}>
                Add feature
              </Button>
            </Flex>

            <Flex direction="row" mb="3">
              <TextField.Root 
                placeholder="Search for features" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}>
              </TextField.Root>
            </Flex>
            
          
            <CheckboxCards.Root
              value={selectedCardnames}
              onValueChange={setSelectedCardnames}
            >
              {filteredFeatures.map((feature) => (
                <CheckboxCards.Item
                  key={feature.cardname}
                  value={feature.cardname}>
                  <Text>{feature.cardname}</Text>
                </CheckboxCards.Item>
              ))}
            </CheckboxCards.Root>
          </label>

          
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Diagnosis
            </Text>
            <CheckboxCards.Root
              value={selectedDiagnosis}
              onValueChange={setSelectedDiagnosis}
            >
            {cardDiagnosis.map((diag) => (
              <CheckboxCards.Item
                key={diag.cardname}
                value={diag.cardname}>
                <Text>{diag.cardname}</Text>
              </CheckboxCards.Item>
            )) }
            </CheckboxCards.Root>
          </label>
          
          
        
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Treatment plan
            </Text>
            <CheckboxCards.Root
              value={selectedPlan}
              onValueChange={setSelectedPlan}
              >
            {cardTreatment.map((treat) => (
              <CheckboxCards.Item
                key={treat.cardname}
                value={treat.cardname}>
                <Text>{treat.cardname}</Text>
              </CheckboxCards.Item>
            ))}
            </CheckboxCards.Root>
          </label>
          

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Alternative plan
            </Text>
            <CheckboxCards.Root
              value={selectedAltPlan}
              onValueChange={setSelectedAltPlan}
              >
            {cardAltTreatment.map((altTreat) => (
              <CheckboxCards.Item
                key={altTreat.cardname}
                value={altTreat.cardname}>
                <Text>{altTreat.cardname}</Text>
              </CheckboxCards.Item>
            ))}
          </CheckboxCards.Root>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Follow up
            </Text>
              <CheckboxCards.Root
                value={selectedFolPlan}
                onValueChange={setSelectedFolPlan}
                >
              {cardFolTreatment.map((fol) => (
                <CheckboxCards.Item
                  key={fol.cardname}
                  value={fol.cardname}>
                  <Text>{fol.cardname}</Text>
                </CheckboxCards.Item>
              ))}
            </CheckboxCards.Root>
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="start">
          <Button type="submit">Approve diagnosis</Button>
        </Flex>
      </form>
    </Flex>
  )
}
