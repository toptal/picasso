// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=72-4
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tooltip/src/Tooltip/Tooltip.tsx
// component=Tooltip

import figma from 'figma'

export default {
  id: 'Tooltip',
  imports: ["import { Tooltip } from '@toptal/picasso'"],
  example: figma.code`<Tooltip content='Tooltip text' compact>
        <span>Hover me</span>
      </Tooltip>`,
} satisfies CodeConnectTemplate
