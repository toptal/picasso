// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18164-1804
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/TagCompound/index.ts
// component=Tag.Checkable

import figma from 'figma'

// Tag is always outlined, so Tag.Checkable stands in for Tag Filled:
// checked (green) for High Contrast, unchecked (light grey) for Low Contrast
const checked = figma.selectedInstance.getEnum('Style', {
  'High Contrast': true,
  'Low Contrast': false,
})
const hasIcon = figma.selectedInstance.getEnum('Layout', {
  'With Icon': true,
  'With Icon + Badge': true,
  'With Indicator + Icon': true,
})
// Tag.Checkable has no endAdornment or indicator, so these parts are left out
const missing = figma.selectedInstance.getEnum('Layout', {
  'With Icon + Badge': 'badge',
  'With Badge': 'badge',
  'With Connection': 'connection',
  'With Indicator + Icon': 'indicator',
})

export default {
  id: 'Tag.Checkable',
  imports: [
    hasIcon
      ? "import { Settings16, Tag } from '@toptal/picasso'"
      : "import { Tag } from '@toptal/picasso'",
  ],
  example: figma.code`${
    missing ? `// Tag.Checkable has no ${missing}; it is left out\n` : ''
  }<Tag.Checkable${figma.helpers.react.renderProp('checked', checked)}${
    hasIcon ? ' icon={<Settings16 />}' : ''
  } onChange={() => {}}>
  Label
</Tag.Checkable>`,
  metadata: { nestable: true },
} satisfies CodeConnectTemplate
