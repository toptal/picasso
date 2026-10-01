// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=13667-16196
// source=https://github.com/toptal/picasso/blob/master/packages/base/Alert/src/AlertCompound/index.ts
// component=Alert

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Color', {
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
})
const onClose = figma.selectedInstance.getBoolean('Close Button', {
  true: figma.helpers.react.function('() => {}'),
  false: undefined,
})
const primary = figma.selectedInstance.getBoolean('CTA Primary')
  ? "primary: { label: 'Primary Action', onClick: () => {} }"
  : undefined
const secondary = figma.selectedInstance.getBoolean('CTA Secondary')
  ? "secondary: { label: 'Secondary Action', onClick: () => {} }"
  : undefined
const actions =
  primary || secondary
    ? figma.helpers.react.identifier(
        `{ ${[primary, secondary].filter(Boolean).join(', ')} }`
      )
    : undefined

export default {
  id: 'Alert',
  imports: ["import { Alert } from '@toptal/picasso'"],
  example: figma.code`<Alert${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp(
    'onClose',
    onClose
  )}${figma.helpers.react.renderProp('actions', actions)}>
  Alert message
</Alert>`,
  metadata: { nestable: true },
}
