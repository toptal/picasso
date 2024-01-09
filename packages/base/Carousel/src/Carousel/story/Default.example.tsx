import React from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const CarouselDefaultExample = () => {
  return (
    <Container style={{ maxWidth: 370 }}>
      <Carousel hasDots hasArrows>
        <SlideExample>Delivery Manager</SlideExample>
        <SlideExample>Designer</SlideExample>
        <SlideExample>Developer</SlideExample>
        <SlideExample>Product manager</SlideExample>
        <SlideExample>Architect</SlideExample>
      </Carousel>
    </Container>
  )
}

const SlideExample = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      flex
      gap={SPACING_2}
      direction='column'
      alignItems='center'
      style={{ maxWidth: '100%' }}
    >
      <Settings16 scale={4} color='blue' />
      <Typography align='center' size='xsmall'>
        {children}
      </Typography>
    </Container>
  )
}

export default CarouselDefaultExample
