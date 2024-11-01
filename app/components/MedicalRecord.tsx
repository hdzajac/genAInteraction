import { Box } from '@radix-ui/themes'

import pictureUrl from '@/assets/picture.jpg'

export default function MedicalRecord() {
  return (
    <Box
      style={{
        backgroundColor: '#fff',
        borderRight: '1px solid #bfbfbf',
      }}
      p="var(--space-4)">
      <img src={pictureUrl} alt="" />

      <Box className="panel">
        <h2>Lesion #3 | Undiagnosed</h2>
        <h4>Læsionens alder</h4>
        <p>Måneder</p>
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
    </Box>
  )
}
