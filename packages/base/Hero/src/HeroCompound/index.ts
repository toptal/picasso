import { Hero } from '../Hero'
import { HeroContent } from '../HeroContent'
import { HeroImage } from '../HeroImage'

export const HeroCompound = Object.assign(Hero, {
  Content: HeroContent,
  Image: HeroImage,
})
