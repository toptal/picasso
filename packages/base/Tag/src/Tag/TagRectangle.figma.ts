// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=261-11652
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/TagCompound/index.ts
// component=Tag.Rectangular

import figma from 'figma'

// "Status" maps to variant for Solid and to indicator for Indicators; the two
// props are mutually exclusive
const isSolid = figma.selectedInstance.getPropertyValue('Style') === 'Solid'
const variant = isSolid
  ? figma.selectedInstance.getEnum('Status', {
      Positive: 'green',
      Dark: 'dark-grey',
      Light: 'light-grey',
      Negative: 'red',
      'Blue Light': 'light-blue',
      Warning: 'yellow',
      Blue: 'blue-main',
      'Blue Darker': 'blue-darker',
    })
  : undefined
const indicator = isSolid
  ? undefined
  : figma.selectedInstance.getEnum('Status', {
      Positive: 'green',
      Dark: 'grey-darker',
      Negative: 'red',
      Warning: 'yellow',
      Blue: 'blue',
      'Blue Darker': 'blue-darker',
      'Blue Light': 'light-blue',
    })

export default {
  id: 'Tag.Rectangular',
  imports: ["import { Tag } from '@toptal/picasso'"],
  example: figma.code`<Tag.Rectangular${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp(
    'indicator',
    indicator
  )}>Label</Tag.Rectangular>`,
  metadata: { nestable: true },
}
