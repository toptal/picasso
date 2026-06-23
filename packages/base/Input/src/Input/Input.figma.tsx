import figma from '@figma/code-connect'
import React from 'react'
import { Input, Form } from '@toptal/picasso'

const INPUT_FIELD_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=18377-1525'

// Figma "State: Filled", "State: Focus", "State: Hover" produce the same code as "State: Default"
// and are therefore not listed as separate connections.
// Figma "State: Error Focus" produces the same code as "State: Error".

// ─── Vertical ───────────────────────────────────────────────────────────────

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Vertical', State: 'Default' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
  },
  example: ({ hint }) => (
    <Form>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Vertical', State: 'Disabled' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
  },
  example: ({ hint }) => (
    <Form>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} disabled placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Vertical', State: 'Error' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
  },
  example: ({ hint }) => (
    <Form>
      <Form.Field hint={hint} error='Error message'>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} status='error' placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

// ─── Horizontal ─────────────────────────────────────────────────────────────

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Horizontal', State: 'Default' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
  },
  example: ({ hint }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Horizontal', State: 'Disabled' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
  },
  example: ({ hint }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint}>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} disabled placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

figma.connect(Input, INPUT_FIELD_URL, {
  variant: { Orientation: 'Horizontal', State: 'Error' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
  },
  example: ({ hint }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint} error='Error message'>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} status='error' placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})
