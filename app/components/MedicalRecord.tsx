import { Box, Flex } from '@radix-ui/themes'

import { SkinTypes } from '@/constants'
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

      <Box className="panel MedicalRecord">
        <h3>Medical record</h3>
        <p>
          {record.age} {record.gender}
        </p>
        <h4>Skin type</h4>
        <p>{SkinTypes[record.skinType]}</p>
        <h4>Family history with melanoma</h4>
        <p>{getValueFromBoolean(record.familyWithMelanoma)}</p>
        <h4>Previous malignant melanoma or skin cancer</h4>
        <p>{getValueFromBoolean(record.previousMelanoma)}</p>
      </Box>

      <Flex className="panel MedicalRecord-images" direction="column" gap="4">
        {record.images.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </Flex>
    </Flex>
  )
}

function getValueFromBoolean(value: boolean) {
  return value ? 'Yes' : 'No'
}
