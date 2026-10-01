// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=665-14182
// source=https://github.com/toptal/picasso/blob/master/packages/base/Tag/src/TagCompound/index.ts
// component=Tag

import figma from 'figma'

// "Hover" is an interaction state with no React prop
const variant = figma.selectedInstance.getEnum('Style', {
  Blue: 'blue',
  Secondary: 'light-grey',
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
})
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true })
const layout = figma.selectedInstance.getPropertyValue('Layout')
const connection = figma.helpers.react.jsxElement(
  '<Tag.Connection>0</Tag.Connection>'
)
const icon = figma.selectedInstance.getEnum('Layout', {
  'With Icon': figma.helpers.react.jsxElement('<Settings16 />'),
  'With Icon & Connection': figma.helpers.react.jsxElement('<Settings16 />'),
})
const onDelete = figma.selectedInstance.getEnum('Layout', {
  'With Remove': figma.helpers.react.function('() => {}'),
})
const endAdornment = figma.selectedInstance.getEnum('Layout', {
  'With Connection': connection,
  'With Icon & Connection': connection,
  'With Badge': figma.helpers.react.jsxElement(
    "<Badge content={1} size='medium' />"
  ),
})
const imported = [
  'Tag',
  icon && 'Settings16',
  layout === 'With Badge' && 'Badge',
]
  .filter(Boolean)
  .join(', ')

export default (layout === 'With Edit' || layout === 'With Edit and Remove'
  ? {
      id: 'Tag',
      imports: [],
      example: figma.code`// Not mapped: Tag has no edit action`,
    }
  : {
      id: 'Tag',
      imports: [`import { ${imported} } from '@toptal/picasso'`],
      example: figma.code`<Tag${figma.helpers.react.renderProp(
        'variant',
        variant
      )}${figma.helpers.react.renderProp(
        'disabled',
        disabled
      )}${figma.helpers.react.renderProp(
        'icon',
        icon
      )}${figma.helpers.react.renderProp(
        'onDelete',
        onDelete
      )}${figma.helpers.react.renderProp('endAdornment', endAdornment)}>
  Label
</Tag>`,
      metadata: { nestable: true },
    }) satisfies CodeConnectTemplate
