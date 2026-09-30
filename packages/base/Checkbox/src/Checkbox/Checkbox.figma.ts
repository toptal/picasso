// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11069
// source=https://github.com/toptal/picasso/blob/master/packages/base/Checkbox/src/CheckboxCompound/index.ts
// component=Checkbox

import figma from 'figma'

const checked = figma.selectedInstance.getEnum('On', {
  True: true,
})
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
})
const indeterminate = figma.selectedInstance.getEnum('State', {
  Indeterminate: true,
})

export default {
  id: 'Checkbox',
  imports: ["import { Checkbox } from '@toptal/picasso'"],
  example: figma.code`<Checkbox${figma.helpers.react.renderProp(
    'checked',
    checked
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp(
    'indeterminate',
    indeterminate
  )} onChange={() => { }}/>`,
  metadata: { nestable: true },
}
