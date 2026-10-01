// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18377-1525
// source=https://github.com/toptal/picasso/blob/master/packages/base/Input/src/Input/Input.tsx
// component=Input

import figma from 'figma'

// Filled, Focus, Hover and Prefilled produce the same code as Default
const isTextField =
  figma.selectedInstance.getPropertyValue('Variant') === 'Text Field'
const layout = figma.selectedInstance.getEnum('Orientation', {
  Horizontal: 'horizontal',
})
const hint = figma.selectedInstance.getBoolean('Show Hint', {
  true: 'Hint text',
  false: undefined,
})
const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})
const disabled = figma.selectedInstance.getEnum('State', { Disabled: true })
const status = figma.selectedInstance.getEnum('State', { Error: 'error' })
const error = figma.selectedInstance.getEnum('State', {
  Error: 'Error message',
})
// Input takes a single icon, so "Icon Right" wins when both are on
const iconPosition = figma.selectedInstance.getBoolean('Icon Right')
  ? 'end'
  : figma.selectedInstance.getBoolean('Icon Left')
  ? 'start'
  : undefined
const icon = iconPosition
  ? figma.helpers.react.jsxElement('<Search16 />')
  : undefined

export default isTextField
  ? {
      id: 'Input',
      imports: [
        icon
          ? "import { Form, Input, Search16 } from '@toptal/picasso'"
          : "import { Form, Input } from '@toptal/picasso'",
      ],
      example: figma.code`<Form${figma.helpers.react.renderProp(
        'layout',
        layout
      )}>
  <Form.Field${figma.helpers.react.renderProp(
    'hint',
    hint
  )}${figma.helpers.react.renderProp('error', error)}>
    <Form.Label>Label</Form.Label>
    <Input${figma.helpers.react.renderProp(
      'size',
      size
    )}${figma.helpers.react.renderProp(
        'disabled',
        disabled
      )}${figma.helpers.react.renderProp(
        'status',
        status
      )}${figma.helpers.react.renderProp(
        'icon',
        icon
      )}${figma.helpers.react.renderProp(
        'iconPosition',
        iconPosition
      )} placeholder='Placeholder' />
  </Form.Field>
</Form>`,
    }
  : {
      id: 'Input',
      imports: [],
      // Select, Number, With Char Counter, Currency and Tags are separate
      // Picasso components, not variants of Input
      example: figma.code`// Not mapped: this Input Field variant is a separate Picasso component (Select, NumberInput, ...)`,
    }
