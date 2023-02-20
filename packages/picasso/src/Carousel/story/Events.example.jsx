import React, { useState } from 'react'
import {
  Carousel,
  Container,
  Typography,
  Settings16,
  Tag,
} from '@toptal/picasso'

const CarouselDefaultExample = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setVisible] = useState(false)

  return (
    <Container>
      {isVisible ? (
        <Tag variant='green'>visible</Tag>
      ) : (
        <Tag variant='red'>hidden</Tag>
      )}

      <Container style={{ maxWidth: 370, marginTop: 400 }}>
        <Typography>current slide: {currentSlide}</Typography>
        <Carousel onSlide={setCurrentSlide} onInView={setVisible}>
          <SlideExample>Delivery Manager</SlideExample>
          <SlideExample>Designer</SlideExample>
          <SlideExample>Developer</SlideExample>
          <SlideExample>Product manager</SlideExample>
          <SlideExample>Architect</SlideExample>
        </Carousel>
      </Container>
    </Container>
  )
}

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
