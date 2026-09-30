// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=261-11652
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/TagCompound/index.ts
// component=Tag.Rectangular

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Style') === 'Solid') {
  const variant = figma.selectedInstance.getEnum('Status', {
    Positive: 'green',
    Dark: 'dark-grey',
    Light: 'light-grey',
    Negative: 'red',
    'Blue Light': 'light-blue',
    Warning: 'yellow',
    Blue: 'blue-main',
    'Blue Darker': 'blue-darker',
  })

  template = {
    id: 'Tag.Rectangular',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag.Rectangular${figma.helpers.react.renderProp(
      'variant',
      variant
    )}>Label</Tag.Rectangular>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue('Style') === 'Indicators') {
  const indicator = figma.selectedInstance.getEnum('Status', {
    Positive: 'green',
    Dark: 'grey-darker',
    Negative: 'red',
    Warning: 'yellow',
    Blue: 'blue',
    'Blue Darker': 'blue-darker',
    'Blue Light': 'light-blue',
  })

  template = {
    id: 'Tag.Rectangular',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag.Rectangular${figma.helpers.react.renderProp(
      'indicator',
      indicator
    )}>Label</Tag.Rectangular>`,
    metadata: { nestable: true },
  }
} else {
  const indicator = figma.selectedInstance.getEnum('Status', {
    Positive: 'green',
    Dark: 'grey-darker',
    Negative: 'red',
    Warning: 'yellow',
    Blue: 'blue',
    'Blue Darker': 'blue-darker',
    'Blue Light': 'light-blue',
  })

  template = {
    id: 'Tag.Rectangular',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag.Rectangular${figma.helpers.react.renderProp(
      'indicator',
      indicator
    )}>Label</Tag.Rectangular>`,
    metadata: { nestable: true },
  }
}

export default template
