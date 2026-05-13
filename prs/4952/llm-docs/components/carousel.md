# Carousel

## Props

### Carousel

| Name | Type | Default | Description |
|------|------|---------|-------------|
| autoplay | `boolean` | `false` | Slide automatically to next slides |
| autoplayDelay | `number` | `3000` | Time in ms before sliding to next slide |
| **children** | `ReactNode` | - | Carousel items |
| rewind | `boolean` | `false` | If true, Carousel will scroll to the beginning/end when its respective endpoint is reached |
| hasDots | `boolean` | `false` | Hide dots from the navigation bar |
| hasArrows | `boolean` | `false` | Hide arrows from the navigation bar |
| slidesToShow | `number` | `1` | The number of slides to show in container |
| slidesToScroll | `number` | `1` | The number of slides to scroll when arrow navigation is used. |
| onSlide | `((currentSlide: number) => void)` | - | Callback triggered when Carousel finished scrolling to a slide |
| testIds | `{ arrows?: string; carousel?: string; dots?: string \| undefined; footer?: string \| undefined; header?: string \| undefined; navigation?: string \| undefined; next?: string \| undefined; prev?: string \| undefined; root?: string \| undefined; } \| undefined` | `{}` | data-testid passed to parts of the Carousel |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
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
```

### Slides to show

When not a whole number is used (2.5), it shows gradient over the last item by default

```tsx
import React from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const CarouselDefaultExample = () => (
  <Container style={{ maxWidth: 370 }}>
    <Carousel slidesToShow={2.5} hasArrows hasDots>
      <SlideExample>Delivery Manager</SlideExample>
      <SlideExample>Designer</SlideExample>
      <SlideExample>Developer</SlideExample>
      <SlideExample>Product manager</SlideExample>
      <SlideExample>Architect</SlideExample>
    </Carousel>
  </Container>
)

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
```

### Navigation

```tsx
import React from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_6, SPACING_2 } from '@toptal/picasso-utils'

const CarouselDefaultExample = () => (
  <Container flex direction='column' gap={SPACING_6}>
    <Container style={{ maxWidth: 370 }}>
      <Carousel hasArrows>
        <SlideExample>Delivery Manager</SlideExample>
        <SlideExample>Designer</SlideExample>
        <SlideExample>Developer</SlideExample>
        <SlideExample>Product manager</SlideExample>
        <SlideExample>Architect</SlideExample>
      </Carousel>
    </Container>
    <Container style={{ maxWidth: 370 }}>
      <Carousel hasDots>
        <SlideExample>Delivery Manager</SlideExample>
        <SlideExample>Designer</SlideExample>
        <SlideExample>Developer</SlideExample>
        <SlideExample>Product manager</SlideExample>
        <SlideExample>Architect</SlideExample>
      </Carousel>
    </Container>
  </Container>
)

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
```

### Events

```tsx
import React, { useState } from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const CarouselDefaultExample = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <Container>
      <Container style={{ maxWidth: 370 }}>
        <Typography>current slide: {currentSlide}</Typography>
        <Carousel onSlide={setCurrentSlide} hasArrows hasDots autoplay>
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
```

### Autoplay

Autoplay will start only after the carousel is visible on the screen

```tsx
import React from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_6, SPACING_2 } from '@toptal/picasso-utils'

const CarouselDefaultExample = () => {
  return (
    <Container flex direction='column' gap={SPACING_6}>
      <Container style={{ maxWidth: 370 }}>
        <Carousel hasDots hasArrows autoplay>
          <SlideExample>Delivery Manager</SlideExample>
          <SlideExample>Designer</SlideExample>
          <SlideExample>Developer</SlideExample>
          <SlideExample>Product manager</SlideExample>
          <SlideExample>Architect</SlideExample>
        </Carousel>
      </Container>
      <Container style={{ maxWidth: 370 }}>
        <Typography align='center'>Custom autoplayDelay</Typography>
        <Carousel hasDots hasArrows autoplay autoplayDelay={1000}>
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
```

### Rewind

```tsx
import React from 'react'
import { Carousel, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const CarouselDefaultExample = () => {
  return (
    <Container style={{ maxWidth: 370 }}>
      <Carousel hasDots hasArrows rewind>
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
```
