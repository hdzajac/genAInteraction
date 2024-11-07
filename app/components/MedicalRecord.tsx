import { Box, Flex, Grid } from '@radix-ui/themes'

import { MedicalRecord as TMedicalRecord } from '@/store/types'
import './MedicalRecord.css'

type Props = {
  record: TMedicalRecord
}

export default function MedicalRecord({ record }: Props) {
  return (
    <Flex
      direction="column"
      gap="4"
      p="var(--space-4)"
      style={{
        backgroundColor: '#fff',
        borderRight: '1px solid #bfbfbf',
      }}>
      <h2>Overview • Lesion #{record.id}</h2>

      <Grid className="panel MedicalRecord-images" columns="1fr 1fr 1fr" gap="4">
        {record.images.map((image, index) => (
          <img key={index} src={'/_build/app/' + image} alt="" />
        ))}
      </Grid>

      <Box className="panel MedicalRecord">
        <h3>Medical record</h3>
        <p>
          {record.age} {record.gender}
        </p>
        <h4>Symptomer</h4>
        <p>Itching, ingen blodning </p>
        <h4>Ændringer i udseende (gennem mineder)</h4>
        <p>Form, elevation</p>
        <h4>Tidligere behandlinger eller trauma</h4>
        <p>Ingen</p>
        <h4>Hudtype</h4>
        <p>Type I</p>
        <h4>ABCD</h4>
        <p>Ingen </p>
        <h4>Ovrige objektive fund</h4>
        <p>Ingen</p>
      </Box>
    </Flex>
  )
}
