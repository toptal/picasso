// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18377-1525
// source=https://github.com/toptal/picasso/blob/master/packages/base/Input/src/Input/Input.tsx
// component=Input

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (
  figma.selectedInstance.getPropertyValue('Orientation') === 'Vertical' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Text Field' &&
  figma.selectedInstance.getPropertyValue('Icon Right') === false
) {
  const hint = figma.selectedInstance.getBoolean('Show Hint', {
    true: 'Hint text',
    false: undefined,
  })
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })
  const status = figma.selectedInstance.getEnum('State', {
    Error: 'error',
  })
  const error = figma.selectedInstance.getEnum('State', {
    Error: 'Error message',
  })
  const icon = figma.selectedInstance.getBoolean('Icon Left', {
    true: figma.helpers.react.jsxElement('<Search16 />'),
    false: undefined,
  })
  const iconPosition = figma.selectedInstance.getBoolean('Icon Left', {
    true: 'start',
    false: undefined,
  })

  template = {
    id: 'Input',
    imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
    example: figma.code`<Form>
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
    )} placeholder='Placeholder'/>
      </Form.Field>
    </Form>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('Orientation') === 'Vertical' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Text Field' &&
  figma.selectedInstance.getPropertyValue('Icon Right') === true
) {
  const hint = figma.selectedInstance.getBoolean('Show Hint', {
    true: 'Hint text',
    false: undefined,
  })
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })
  const status = figma.selectedInstance.getEnum('State', {
    Error: 'error',
  })
  const error = figma.selectedInstance.getEnum('State', {
    Error: 'Error message',
  })

  template = {
    id: 'Input',
    imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
    example: figma.code`<Form>
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
    )} icon={<Search16 />} iconPosition='end' placeholder='Placeholder'/>
      </Form.Field>
    </Form>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('Orientation') === 'Horizontal' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Text Field' &&
  figma.selectedInstance.getPropertyValue('Icon Right') === false
) {
  const hint = figma.selectedInstance.getBoolean('Show Hint', {
    true: 'Hint text',
    false: undefined,
  })
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })
  const status = figma.selectedInstance.getEnum('State', {
    Error: 'error',
  })
  const error = figma.selectedInstance.getEnum('State', {
    Error: 'Error message',
  })
  const icon = figma.selectedInstance.getBoolean('Icon Left', {
    true: figma.helpers.react.jsxElement('<Search16 />'),
    false: undefined,
  })
  const iconPosition = figma.selectedInstance.getBoolean('Icon Left', {
    true: 'start',
    false: undefined,
  })

  template = {
    id: 'Input',
    imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
    example: figma.code`<Form layout='horizontal'>
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
    )} placeholder='Placeholder'/>
      </Form.Field>
    </Form>`,
    metadata: { nestable: true },
  }
} else if (
  figma.selectedInstance.getPropertyValue('Orientation') === 'Horizontal' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Text Field' &&
  figma.selectedInstance.getPropertyValue('Icon Right') === true
) {
  const hint = figma.selectedInstance.getBoolean('Show Hint', {
    true: 'Hint text',
    false: undefined,
  })
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })
  const status = figma.selectedInstance.getEnum('State', {
    Error: 'error',
  })
  const error = figma.selectedInstance.getEnum('State', {
    Error: 'Error message',
  })

  template = {
    id: 'Input',
    imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
    example: figma.code`<Form layout='horizontal'>
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
    )} icon={<Search16 />} iconPosition='end' placeholder='Placeholder'/>
      </Form.Field>
    </Form>`,
    metadata: { nestable: true },
  }
} else {
  const hint = figma.selectedInstance.getBoolean('Show Hint', {
    true: 'Hint text',
    false: undefined,
  })
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  })
  const disabled = figma.selectedInstance.getEnum('State', {
    Disabled: true,
  })
  const status = figma.selectedInstance.getEnum('State', {
    Error: 'error',
  })
  const error = figma.selectedInstance.getEnum('State', {
    Error: 'Error message',
  })

  template = {
    id: 'Input',
    imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
    example: figma.code`<Form layout='horizontal'>
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
    )} icon={<Search16 />} iconPosition='end' placeholder='Placeholder'/>
      </Form.Field>
    </Form>`,
    metadata: { nestable: true },
  }
}

export default template
