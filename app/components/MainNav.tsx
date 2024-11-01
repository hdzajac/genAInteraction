import { Box, Flex } from '@radix-ui/themes'

import pictureUrl from '@/assets/picture.jpg'

import './MainNav.css'

export default function MainNav() {
  const casesList = [
    {
      title: '#3 Undiagnosed',
      date: '2024-10-10',
      image: 'picture.jpg',
    },
    {
      title: '#2 Benign nevus',
      date: '2024-10-10',
      image: 'picture.jpg',
    },
    {
      title: '#1 Melanoma',
      date: '2024-10-10',
      image: 'picture.jpg',
    },
  ]

  return (
    <Box width="260px" height="100%" className="MainNav">
      <Box p="3" className="MainNav-separator">
        Male <span>010180-1234</span>
      </Box>
      <Box p="3">
        <div>
          <h4>Familie-historik med melanom</h4>
          <p>Ja</p>
        </div>
        <div>
          <h4>Tidligere malignt melanom eller hudcancer</h4>
          <p>Ja</p>
        </div>

        <div>
          <h4>Risikofaktorer</h4>
          <p>Hyppige solforbrandinger, immunhæmmende behandling</p>
        </div>
      </Box>

      <Box p="3" className="MainNav-separator">
        Lesions
      </Box>

      <ul className="MainNav-casesList">
        {casesList.map(({ title, date }, index) => (
          <li className={index === 1 ? 'active' : ''} key={index}>
            <Flex gap="2">
              <img src={pictureUrl} alt="" />
              <div>
                <div>{title}</div>
                <div>{date}</div>
              </div>
            </Flex>
          </li>
        ))}
      </ul>
    </Box>
  )
}
