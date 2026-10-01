// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=82-100
// source=https://github.com/toptal/picasso/blob/master/packages/base/Accordion/src/AccordionCompound/index.ts
// component=Accordion

import figma from 'figma'

const expanded = figma.selectedInstance.getEnum('Expanded', {
  True: true,
  False: false,
})
const borders = figma.selectedInstance.getEnum('Borders', {
  'No Borders': 'none',
  'With Borders': 'all',
  'With Bottom Border': 'middle',
  'With Top Border': 'middle',
})

export default {
  id: 'Accordion',
  imports: ["import { Accordion } from '@toptal/picasso'"],
  example: figma.code`<Accordion${figma.helpers.react.renderProp(
    'expanded',
    expanded
  )}${figma.helpers.react.renderProp(
    'borders',
    borders
  )} content={<Accordion.Details>Content goes here.</Accordion.Details>}>
      <Accordion.Summary>Summary</Accordion.Summary>
    </Accordion>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
