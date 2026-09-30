// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=7034-18634
// source=https://github.com/toptal/picasso/blob/master/packages/base/Carousel/src/Carousel/Carousel.tsx
// component=Carousel

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Pagination + Arrows'
) {
  template = {
    id: 'Carousel',
    imports: ["import { Carousel } from '@toptal/picasso'"],
    example: figma.code`<Carousel hasDots hasArrows>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Pagination Only'
) {
  template = {
    id: 'Carousel',
    imports: ["import { Carousel } from '@toptal/picasso'"],
    example: figma.code`<Carousel hasDots>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Arrows Only'
) {
  template = {
    id: 'Carousel',
    imports: ["import { Carousel } from '@toptal/picasso'"],
    example: figma.code`<Carousel hasArrows>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>`,
  }
} else {
  template = {
    id: 'Carousel',
    imports: ["import { Carousel } from '@toptal/picasso'"],
    example: figma.code`<Carousel hasArrows>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>`,
  }
}

export default template
