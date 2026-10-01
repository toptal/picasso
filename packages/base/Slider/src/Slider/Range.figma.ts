// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=339-14167
// source=https://github.com/toptal/picasso/blob/master/packages/base/Slider/src/Slider/Slider.tsx
// component=Slider

import figma from 'figma'

export default {
  id: 'Slider',
  imports: ["import { Slider } from '@toptal/picasso'"],
  example: figma.code`<Slider value={[20, 80]} onChange={() => { }} tooltip='on'/>`,
} satisfies CodeConnectTemplate
