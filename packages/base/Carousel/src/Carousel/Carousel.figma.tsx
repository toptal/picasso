import figma from '@figma/code-connect'
import React from 'react'
import { Carousel } from '@toptal/picasso'

const CAROUSEL_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=7034-18634'

// Figma "Variant" controls two independent React booleans (hasDots / hasArrows),
// so each variant state needs its own figma.connect() call.

figma.connect(Carousel, CAROUSEL_URL, {
  variant: { Variant: 'Pagination + Arrows' },
  example: () => (
    <Carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  ),
})

figma.connect(Carousel, CAROUSEL_URL, {
  variant: { Variant: 'Pagination Only' },
  example: () => (
    <Carousel hasArrows={false}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  ),
})

figma.connect(Carousel, CAROUSEL_URL, {
  variant: { Variant: 'Arrows Only' },
  example: () => (
    <Carousel hasDots={false}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  ),
})
