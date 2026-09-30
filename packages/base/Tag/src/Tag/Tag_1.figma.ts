// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18164-1804
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/TagCompound/index.ts
// component=Tag.Checkable

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Layout') === 'Basic') {
  const checked = figma.selectedInstance.getEnum('Style', {
    'High Contrast': true,
    'Low Contrast': false,
  })

  template = {
    id: 'Tag.Checkable',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag.Checkable${figma.helpers.react.renderProp(
      'checked',
      checked
    )} onChange={() => { }}>
      Label
    </Tag.Checkable>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue('Layout') === 'With Icon') {
  const checked = figma.selectedInstance.getEnum('Style', {
    'High Contrast': true,
    'Low Contrast': false,
  })

  template = {
    id: 'Tag.Checkable',
    imports: [
      "import { Tag } from '@toptal/picasso'",
      "import { Settings16 } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<Tag.Checkable${figma.helpers.react.renderProp(
      'checked',
      checked
    )} icon={<Settings16 />} onChange={() => { }}>
      Label
    </Tag.Checkable>`,
    metadata: { nestable: true },
  }
} else {
  const checked = figma.selectedInstance.getEnum('Style', {
    'High Contrast': true,
    'Low Contrast': false,
  })

  template = {
    id: 'Tag.Checkable',
    imports: [
      "import { Tag } from '@toptal/picasso'",
      "import { Settings16 } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<Tag.Checkable${figma.helpers.react.renderProp(
      'checked',
      checked
    )} icon={<Settings16 />} onChange={() => { }}>
      Label
    </Tag.Checkable>`,
    metadata: { nestable: true },
  }
}

export default template
