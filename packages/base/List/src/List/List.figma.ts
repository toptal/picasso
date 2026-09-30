// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=155-2165
// source=https://github.com/toptal/picasso/blob/master/packages/base/List/src/List/List.tsx
// component=List.Item

import figma from 'figma'

const variant = figma.selectedInstance.getEnum('Style', {
  'Unordered (Bullet)': 'unordered',
  'Unordered (Circle)': 'unordered',
  'Unordered (Checkmark)': 'unordered',
  'Unordered (Arrow)': 'unordered',
  'Ordered (Cardinal)': 'ordered',
  'Ordered (Letter)': 'ordered',
  'Ordered (Roman)': 'ordered',
})
const styleType = figma.selectedInstance.getEnum('Style', {
  'Unordered (Bullet)': 'disc',
  'Unordered (Circle)': 'circle',
  'Unordered (Checkmark)': 'checkmark',
  'Unordered (Arrow)': 'arrow',
  'Ordered (Cardinal)': 'numeral',
  'Ordered (Letter)': 'alpha',
  'Ordered (Roman)': 'roman',
})

export default {
  id: 'List.Item',
  imports: ["import { List } from '@toptal/picasso'"],
  example: figma.code`<List${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp('styleType', styleType)}>
        <List.Item>List item one</List.Item>
        <List.Item>List item two</List.Item>
        <List.Item>List item three</List.Item>
      </List>`,
  metadata: { nestable: true },
}
