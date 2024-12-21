import { Metadata } from 'next'
import Minigame from '../Minigame'
import About from '../About'

export const metadata: Metadata = {
  title: 'Fingerprint Scanner Simulator - GTA Online Casino Heist',
  description:
    'Practice the Fingerprint Scanner hack of the GTA Online Casino Heist using this simulator.',
}

export default function Page() {
  return (
    <Minigame>
      <About />
    </Minigame>
  )
}
