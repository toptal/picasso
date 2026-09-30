// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=139-2234
// source=https://github.com/toptal/picasso/blob/master/packages/base/Container/src/Container/Container.tsx
// component=Container

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Color', {
  Blue: 'blue',
  Gray: 'grey',
  Green: 'green',
  Red: 'red',
  White: 'white',
  Yellow: 'yellow',
})

export default {
  id: 'Container',
  imports: ["import { Container } from '@toptal/picasso'"],
  example: figma.code`<Container${figma.helpers.react.renderProp(
    'variant',
    variant
  )}>Content</Container>`,
  metadata: { nestable: true },
}
