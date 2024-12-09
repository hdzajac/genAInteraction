import { Box, Button, Dialog, Flex } from '@radix-ui/themes'

import { SkinTypes } from '@/constants'
import { MedicalRecord as TMedicalRecord } from '@/store/types'
import './MedicalRecord.css'
import { X } from 'lucide-react'

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
    <Dialog.Root>
      <Dialog.Trigger>
        <img src={image} alt="" />
      </Dialog.Trigger>

      <Dialog.Content
        height="85vh"
        maxWidth="auto"
        aria-describedby={undefined}
        style={{ padding: 0 }}>
        <Dialog.Close>
          <Button
            variant="soft"
            color="gray"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 9,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}>
            <X />
          </Button>
        </Dialog.Close>

        <img className="MedicalRecord-fullscreenImg" src={image} alt="" />
      </Dialog.Content>
    </Dialog.Root>
  )
}
