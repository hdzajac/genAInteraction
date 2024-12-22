import { Box, Button, Flex } from '@radix-ui/themes'
import { Undo, ZoomIn, ZoomOut } from 'lucide-react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

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

      <Flex className="panel MedicalRecord-images" direction="column" gap="4">
        {record.images.map((image, index) => (
          <ImageViewer key={index} image={image} />
        ))}
      </Flex>

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
    </Flex>
  )
}

function getValueFromBoolean(value: boolean) {
  return value ? 'Yes' : 'No'
}

type ImageViewerProps = {
  image: string
}

function ImageViewer({ image }: ImageViewerProps) {
  return (
    <Box position="relative">
      <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <Flex gap="1" position="absolute" top="4" right="4" style={{ zIndex: 1 }}>
              <Button variant="soft" onClick={() => zoomIn()} color="gray">
                <ZoomIn color="white" size={18} />
              </Button>
              <Button variant="soft" onClick={() => zoomOut()} color="gray">
                <ZoomOut color="white" size={18} />
              </Button>
              <Button variant="soft" onClick={() => resetTransform()} color="gray">
                <Undo color="white" size={18} />
              </Button>
            </Flex>
            <TransformComponent>
              <img src={image} alt="" />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </Box>
  )
}
