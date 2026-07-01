import figma from '@figma/code-connect'
import React from 'react'
import { Input, Form, Search16 } from '@toptal/picasso'

const INPUT_FIELD_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18377-1525'

// Figma "State: Filled", "State: Focus", "State: Hover", "State: Prefilled"
// produce the same code as "State: Default" and are not listed separately.
// "State: Error Focus" produces the same code as "State: Error".
// "Icon Right" maps to icon + iconPosition='end'; shown here via "Icon Left" (start).
// Other Variant values (Select, Number, Currency, Tags) map to separate Picasso components.

// ─── Vertical ───────────────────────────────────────────────────────────────

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Vertical', Variant: 'Text Field', State: 'Default' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    icon: figma.boolean('Icon Left', {
      true: <Search16 />,
      false: undefined,
    }),
  },
  example: ({ hint, size, icon }) => (
    <Form>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input
          size={size}
          icon={icon}
          iconPosition='start'
          placeholder='Placeholder'
        />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: {
    Orientation: 'Vertical',
    Variant: 'Text Field',
    State: 'Disabled',
  },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ hint, size }) => (
    <Form>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input size={size} disabled placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Vertical', Variant: 'Text Field', State: 'Error' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ hint, size }) => (
    <Form>
      <Form.Field hint={hint} error='Error message'>
        <Form.Label>Label</Form.Label>
        <Input size={size} status='error' placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

// ─── Horizontal ─────────────────────────────────────────────────────────────

figma.connect(Input, INPUT_FIELD_URL, {
  variant: {
    Orientation: 'Horizontal',
    Variant: 'Text Field',
    State: 'Default',
  },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    icon: figma.boolean('Icon Left', {
      true: <Search16 />,
      false: undefined,
    }),
  },
  example: ({ hint, size, icon }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input
          size={size}
          icon={icon}
          iconPosition='start'
          placeholder='Placeholder'
        />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: {
    Orientation: 'Horizontal',
    Variant: 'Text Field',
    State: 'Disabled',
  },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ hint, size }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input size={size} disabled placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: {
    Orientation: 'Horizontal',
    Variant: 'Text Field',
    State: 'Error',
  },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ hint, size }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint} error='Error message'>
        <Form.Label>Label</Form.Label>
        <Input size={size} status='error' placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})
