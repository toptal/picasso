// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=665-14182
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/TagCompound/index.ts
// component=Tag

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Layout') === 'Basic') {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp('disabled', disabled)}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue('Layout') === 'With Icon') {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: [
      "import { Tag } from '@toptal/picasso'",
      "import { Settings16 } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )} icon={<Settings16 />}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('Layout') === 'With Remove'
) {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )} onDelete={() => { }}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('Layout') === 'With Connection'
) {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: ["import { Tag } from '@toptal/picasso'"],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )} endAdornment={<Tag.Connection>0</Tag.Connection>}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('Layout') === 'With Icon & Connection'
) {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: [
      "import { Tag } from '@toptal/picasso'",
      "import { Settings16 } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )} icon={<Settings16 />} endAdornment={<Tag.Connection>0</Tag.Connection>}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue('Layout') === 'With Badge') {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: ["import { Tag, Badge } from '@toptal/picasso'"],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )} endAdornment={<Badge content={1} size='medium'/>}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
} else {
  const variant = figma.selectedInstance.getEnum('Style', {
    Blue: 'blue',
    Secondary: 'light-grey',
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })

  template = {
    id: 'Tag',
    imports: ["import { Tag, Badge } from '@toptal/picasso'"],
    example: figma.code`<Tag${figma.helpers.react.renderProp(
      'variant',
      variant
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled
    )} endAdornment={<Badge content={1} size='medium'/>}>
      Label
    </Tag>`,
    metadata: { nestable: true },
  }
}

export default template
