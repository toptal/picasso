// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=14636-2085
// source=https://github.com/toptal/picasso/blob/master/packages/base/Helpbox/src/HelpboxCompound/index.ts
// component=Helpbox

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Color', {
  Gray: 'grey',
  Green: 'green',
  Yellow: 'yellow',
  Red: 'red',
  Blue: 'blue',
  White: 'white',
})

export default {
  id: 'Helpbox',
  imports: ["import { Helpbox } from '@toptal/picasso'"],
  example: figma.code`<Helpbox${figma.helpers.react.renderProp(
    'variant',
    variant
  )}>
      <Helpbox.Title>Title</Helpbox.Title>
      <Helpbox.Content>Content</Helpbox.Content>
    </Helpbox>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
