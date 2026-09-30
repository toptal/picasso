// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11325
// source=https://github.com/toptal/picasso/blob/master/packages/base/Radio/src/RadioCompound/index.ts
// component=Radio

import figma from 'figma'

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
})

export default {
  id: 'Radio',
  imports: ["import { Radio } from '@toptal/picasso'"],
  example: figma.code`<Radio label='Label'${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )} onChange={() => { }}/>`,
  metadata: { nestable: true },
}
