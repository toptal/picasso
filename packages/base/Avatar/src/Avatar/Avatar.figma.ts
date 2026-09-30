// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=463-15416
// source=https://github.com/toptal/picasso/blob/master/packages/base/Avatar/src/AvatarCompound/index.ts
// component=Avatar

import figma from 'figma'

const size = figma.selectedInstance.getEnum('Size', {
  '32px': 'xxsmall',
  '40px': 'xsmall',
  '80px': 'small',
  '120px': 'medium',
  '160px': 'large',
})

export default {
  id: 'Avatar',
  imports: ["import { Avatar } from '@toptal/picasso'"],
  example: figma.code`<Avatar${figma.helpers.react.renderProp(
    'size',
    size
  )} src='https://example.com/avatar.jpg' name='John Doe'/>`,
  metadata: { nestable: true },
}
