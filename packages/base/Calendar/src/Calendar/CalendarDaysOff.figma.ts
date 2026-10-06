// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=2978-15508
// source=https://github.com/toptal/picasso/blob/master/packages/base/Calendar/src/Calendar/Calendar.tsx
// component=Calendar

import figma from 'figma'

export default {
  id: 'Calendar',
  imports: ["import { Calendar } from '@toptal/picasso'"],
  example: figma.code`<Calendar disableDays={{ dayOfWeek: [0, 6] }} onChange={() => { }}/>`,
} satisfies CodeConnectTemplate
