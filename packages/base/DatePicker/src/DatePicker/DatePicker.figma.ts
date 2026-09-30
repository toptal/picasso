// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16058-7027
// source=https://github.com/toptal/picasso/blob/master/packages/base/DatePicker/src/DatePicker/DatePicker.tsx
// component=DatePicker

import figma from 'figma'

const numberOfMonths = figma.selectedInstance.getEnum('Variant', {
  '1 Month view': 1,
  '2 Month view': 2,
})
const footer = figma.selectedInstance.getBoolean('Footer', {
  true: figma.helpers.react.jsxElement('<span>Footer content</span>'),
  false: undefined,
})

export default {
  id: 'DatePicker',
  imports: ["import { DatePicker } from '@toptal/picasso'"],
  example: figma.code`<DatePicker value={undefined}${figma.helpers.react.renderProp(
    'numberOfMonths',
    numberOfMonths
  )}${figma.helpers.react.renderProp('footer', footer)} onChange={() => { }}/>`,
  metadata: { nestable: true },
}
