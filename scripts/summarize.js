import fs from 'fs'
import OpenAI from 'openai'

const openAI = new OpenAI({
})

const assistance = [
  'Der ønskes en diagnostisk afklaring af læsionen.',
  '62 årig mand uden tidligere hudkræft, henvises med læsion af ukendt alder.',
  'Min umiddelbare diagnose er Seb. K.',
  'Rigtig pæne billeder, godt klaret!',
  'Der er milia-like cysts i toppen af det dermoskopiske billede og fat fingers neders i randen',
  'Det er sandsynligvis ikke et nevus.',
  'Milia-like cysts,  fat fingers og en lignende knup ved siden af læsionen taler for diagnosen Seb.k. ',
  'Du kan læse mere om hvad en seb. K. er her: https://dermnetnz.org/topics/seborrhoeic-keratosis eller via læringsapp:en (Dermloop learn)',
  'Der er ikke behov for yderligere behandling, afslut uden videre opfølgning',
  'Ved ABCD ændringer i denne eller andre læsioner opfordres pt. til at søge egen læge.',
  'Pt. bør opfordres til solprofylakse',
]

const longStrings = [
  'Egen læge ønsker en diagnostisk afklaring, forslag til videre håndtering og hvis muligt gerne feedback relateret til hvorfor det er den givne diagnose',
  'Læsion på hø. Arm ønskes vurderet på en 41 årig mand med hudtype II og ingen tidligere hudkræft eller brug af immunsupprimerende behandling. Læsionen har været der igennem år og er ændret henover det sidste år svarende til at den er vokset.',
  'Jeg er ikke i tvivl om at det drejer sig om et dermatofibrom',
  'Super gode billeder. Det kliniske billede giver en god overblik og fremstår knivskarpt. Det dermoskopiske billede er ligeledes skarpt!',
  'Centralt på dermatoskopien ses en hvid baggrund der radierer ud til alle sider. Og omkring dette er der et retikulært pigment netværk der ligeledes radierer til alle sider. Klinisk er læsionen let violet og eleveret.',
  'Jeg er helt enig, det ser ud til at være et dermatofibrom. Godt klaret!',
  'Elevationen og den let violette fremtoning på overbliks billedet taler for dermatofibrom. Ligeledes er dermoskopien forenlig med dermatofibrom da der ses centralt radierende arvævs lignende område i baggrunden, under pigmentnetværket de også radierer til siderne. Der er ikke nogen oplagt differential diagnose. ',
  'Et dermatofibrom er en godartet hudtumor, ofte forårsaget af en reaktion på en mindre skade, insektbid eller betændelse i huden. Det præsenterer sig typisk som en fast, let pigmenteret, nodulær læsion, der er ofte palperbar og kan føles som en lille knude i huden. Dermatofibromer er oftest 5-10 mm i diameter og kan variere i farve fra brun til rødlig. Klinisk kendetegnes de ved en central indtrækning, når de klemmes lateralt (dimple sign). Dermatofibromer er harmløse og kræver sjældent behandling medmindre de er symptomatiske eller kosmetisk generende.',
  'Læsionen er helt fredelig og patientenkan beroliges og afsluttes uden opfølgning. Det vil dog være en god ide at opfordre til løbende solprofylakse og selvkontrol af læsioner for at undegå fremtidige tilfælde af hudkræft.',
  'Jeg ville opfordre til generel egenkontrol af læioner og gøre pt. særligt opmærksom på at denne læsion godt må vokse en smule, men at ved væsentlig vækst eller hurtig vækst bør pt. kontakte egen læge igen.',
  'På dermoskopiske billeder af eleverede læsioner, læsioner placeret hvor der er meget hår og læsioner hvor huden er tør/skællende hjælper det gevaldigt hvis der påføres sprit på læsionen forud for dermoskopien.',
]

for await (const [index, text] of longStrings.entries()) {
  console.log('Original >>> ', text)

  const response = await openAI.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'assistant', content: assistance[index] },
      {
        role: 'user',
        content: 'Make the following text more concise and to the point: "' + text + '"',
      },
    ],
  })

  console.log('Result >>>', response.choices[0].message.content)

  fs.appendFileSync('./summarize-c2-v2-assistant.txt', response.choices[0].message.content + '\n')
}
