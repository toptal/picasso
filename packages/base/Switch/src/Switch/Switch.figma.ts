// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=172-2265
// source=https://github.com/toptal/picasso/blob/master/packages/base/Switch/src/Switch/Switch.tsx
// component=Switch

import figma from 'figma'

const checked = figma.selectedInstance.getBoolean('On')
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
  Enabled: false,
  'Hover & Focus': false,
})

export default {
  id: 'Switch',
  imports: ["import { Switch } from '@toptal/picasso'"],
  example: figma.code`<Switch${figma.helpers.react.renderProp(
    'checked',
    checked
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )} onChange={() => { }}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
