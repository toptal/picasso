import figma from '@figma/code-connect'
import React from 'react'
import { Input, Form, Search16 } from '@toptal/picasso'

const INPUT_FIELD_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18377-1525'

// Figma "State" maps to props: Disabled → disabled, Error → status + field
// error. Filled, Focus, Hover and Prefilled produce the same code as Default.
// React Input takes a single icon, so "Icon Right" wins when both are on.
// Search16 inside the "Icon Left" mapping is not auto-imported by the
// parser, hence the explicit imports on those connections.
// Other Variant values (Select, Number, Currency, Tags) map to separate
// Picasso components.

// ─── Vertical ─────────────────────────────────────────────────────────────────

figma.connect(Input, INPUT_FIELD_URL, {
  variant: {
    Orientation: 'Vertical',
    Variant: 'Text Field',
    'Icon Right': false,
  },
  imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    disabled: figma.enum('State', { Disabled: true }),
    status: figma.enum('State', { Error: 'error' }),
    error: figma.enum('State', { Error: 'Error message' }),
    icon: figma.boolean('Icon Left', {
      true: <Search16 />,
      false: undefined,
    }),
    iconPosition: figma.boolean('Icon Left', {
      true: 'start',
      false: undefined,
    }),
  },
  example: ({ hint, size, disabled, status, error, icon, iconPosition }) => (
    <Form>
      <Form.Field hint={hint} error={error}>
        <Form.Label>Label</Form.Label>
        <Input
          size={size}
          disabled={disabled}
          status={status}
          icon={icon}
          iconPosition={iconPosition}
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
    'Icon Right': true,
  },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    disabled: figma.enum('State', { Disabled: true }),
    status: figma.enum('State', { Error: 'error' }),
    error: figma.enum('State', { Error: 'Error message' }),
  },
  example: ({ hint, size, disabled, status, error }) => (
    <Form>
      <Form.Field hint={hint} error={error}>
        <Form.Label>Label</Form.Label>
        <Input
          size={size}
          disabled={disabled}
          status={status}
          icon={<Search16 />}
          iconPosition='end'
          placeholder='Placeholder'
        />
      </Form.Field>
    </Form>
  ),
})

// ─── Horizontal ───────────────────────────────────────────────────────────────

figma.connect(Input, INPUT_FIELD_URL, {
  variant: {
    Orientation: 'Horizontal',
    Variant: 'Text Field',
    'Icon Right': false,
  },
  imports: ["import { Input, Form, Search16 } from '@toptal/picasso'"],
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    disabled: figma.enum('State', { Disabled: true }),
    status: figma.enum('State', { Error: 'error' }),
    error: figma.enum('State', { Error: 'Error message' }),
    icon: figma.boolean('Icon Left', {
      true: <Search16 />,
      false: undefined,
    }),
    iconPosition: figma.boolean('Icon Left', {
      true: 'start',
      false: undefined,
    }),
  },
  example: ({ hint, size, disabled, status, error, icon, iconPosition }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint} error={error}>
        <Form.Label>Label</Form.Label>
        <Input
          size={size}
          disabled={disabled}
          status={status}
          icon={icon}
          iconPosition={iconPosition}
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
    'Icon Right': true,
  },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    disabled: figma.enum('State', { Disabled: true }),
    status: figma.enum('State', { Error: 'error' }),
    error: figma.enum('State', { Error: 'Error message' }),
  },
  example: ({ hint, size, disabled, status, error }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint} error={error}>
        <Form.Label>Label</Form.Label>
        <Input
          size={size}
          disabled={disabled}
          status={status}
          icon={<Search16 />}
          iconPosition='end'
          placeholder='Placeholder'
        />
      </Form.Field>
    </Form>
  ),
})
