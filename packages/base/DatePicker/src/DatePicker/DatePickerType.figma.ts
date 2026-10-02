// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18781-1934
// source=https://github.com/toptal/picasso/blob/master/packages/base/DatePicker/src/DatePicker/DatePicker.tsx
// component=DatePicker

import figma from 'figma'

const dropdownNavigation = figma.selectedInstance.getEnum('Variant', {
  'Date Selection': true,
})

export default {
  id: 'DatePicker',
  imports: ["import { DatePicker } from '@toptal/picasso'"],
  example: figma.code`<DatePicker value={undefined}${figma.helpers.react.renderProp(
    'dropdownNavigation',
    dropdownNavigation
  )} onChange={() => { }}/>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
