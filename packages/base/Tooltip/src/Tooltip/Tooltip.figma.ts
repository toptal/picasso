// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=78-141
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tooltip/src/Tooltip/Tooltip.tsx
// component=Tooltip

import figma from 'figma'

const placement = figma.selectedInstance.getEnum('Position', {
  Bottom: 'bottom',
  Top: 'top',
  Right: 'right',
  Left: 'left',
})

export default {
  id: 'Tooltip',
  imports: ["import { Tooltip } from '@toptal/picasso'"],
  example: figma.code`<Tooltip content='Tooltip text'${figma.helpers.react.renderProp(
    'placement',
    placement
  )}>
        <span>Hover me</span>
      </Tooltip>`,
  metadata: { nestable: true },
}
