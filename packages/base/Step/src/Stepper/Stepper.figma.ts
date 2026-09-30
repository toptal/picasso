// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=180-3409
// source=https://github.com/toptal/picasso/blob/master/packages/base/Step/src/StepperCompound/index.ts
// component=Stepper

import figma from 'figma'

const hideLabels = figma.selectedInstance.getBoolean('All Labels', {
  true: false,
  false: true,
})

export default {
  id: 'Stepper',
  imports: ["import { Stepper } from '@toptal/picasso'"],
  example: figma.code`<Stepper active={1}${figma.helpers.react.renderProp(
    'hideLabels',
    hideLabels
  )} steps={['Step 1', 'Step 2', 'Step 3']}/>`,
  metadata: { nestable: true },
}
