// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11326
// source=https://github.com/toptal/picasso/blob/master/packages/base/Checkbox/src/CheckboxCompound/index.ts
// component=Checkbox

import figma from 'figma'

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
})

export default {
  id: 'Checkbox',
  imports: ["import { Checkbox } from '@toptal/picasso'"],
  example: figma.code`<Checkbox label='Label'${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )} onChange={() => { }}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
