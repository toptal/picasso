// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=180-3737
// source=https://github.com/toptal/picasso/blob/master/packages/base/FileInput/src/ProgressBar/ProgressBar.tsx
// component=ProgressBar

import figma from 'figma'

const showPercentage = figma.selectedInstance.getBoolean('Show %')

export default {
  id: 'ProgressBar',
  imports: ["import { ProgressBar } from '@toptal/picasso'"],
  example: figma.code`<ProgressBar value={50}${figma.helpers.react.renderProp(
    'showPercentage',
    showPercentage
  )}/>`,
  metadata: { nestable: true },
}
