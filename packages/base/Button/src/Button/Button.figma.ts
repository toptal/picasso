// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16828-7595
// source=https://github.com/toptal/picasso/blob/master/packages/base/Button/src/ButtonCompound/index.ts
// component=Button

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Positive: 'positive',
  Danger: 'negative',
  Transparent: 'transparent',
})
const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
})
const loading = figma.selectedInstance.getEnum('State', {
  Loader: true,
})
const children = figma.selectedInstance.findText('Button').__render__()

export default {
  id: 'Button',
  imports: ["import { Button } from '@toptal/picasso'"],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('loading', loading)}>
        ${figma.helpers.react.renderChildren(children)}
      </Button>`,
  metadata: { nestable: true },
}
