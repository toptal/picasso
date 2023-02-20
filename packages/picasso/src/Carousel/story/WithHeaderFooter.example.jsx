import React from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'

const CarouselDefaultExample = () => (
  <Container style={{ maxWidth: 370 }}>
    <Carousel
      header={
        <Typography size='small' align='center'>
          A typical Toptal Projects engagement
          <br />
          includes these four roles.
        </Typography>
      }
      footer={
        <Typography size='small' align='center'>
          A typical Toptal Projects engagement
          <br />
          includes these four roles.
        </Typography>
      }
    >
      <SlideExample>Delivery Manager</SlideExample>
      <SlideExample>Designer</SlideExample>
      <SlideExample>Developer</SlideExample>
      <SlideExample>Product manager</SlideExample>
      <SlideExample>Architect</SlideExample>
    </Carousel>
  </Container>
)

const SlideExample = ({ children }) => {
  return (
    <div>
      <Container
        flex
        gap='xsmall'
        direction='column'
        alignItems='center'
        style={{ maxWidth: '100%' }}
      >
        <Settings16 scale={4} color='blue' />
        <Typography align='center' size='xsmall'>
          {children}
        </Typography>
      </Container>
    </div>
  )
}

export default CarouselDefaultExample
