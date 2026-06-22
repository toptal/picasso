import figma from '@figma/code-connect'
import React from 'react'
import { Input } from '@toptal/picasso-input'
import { FormCompound as Form } from '@toptal/picasso-form'

const VERTICAL_URL =
  'https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=12157-43689'

const HORIZONTAL_URL =
  'https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=12159-43888'

// Figma "State: Filled" and "State: Focus" produce the same code as "State: Default"
// and are therefore not listed as separate connections.
// Figma "State: Error Focus" produces the same code as "State: Error".
// Figma "Show Label" (vertical only) has no direct React equivalent — label is always rendered.

// ─── Vertical ───────────────────────────────────────────────────────────────

figma.connect(Input, VERTICAL_URL, {
  variant: { State: 'Default' },
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

figma.connect(Input, VERTICAL_URL, {
  variant: { State: 'Disabled' },
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

figma.connect(Input, VERTICAL_URL, {
  variant: { State: 'Error' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    error: figma.boolean('Show Error', {
      true: 'Error message',
      false: undefined,
    }),
  },
  example: ({ hint, error }) => (
    <Form>
      <Form.Field hint={hint} error={error}>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} status='error' placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})

// ─── Horizontal ─────────────────────────────────────────────────────────────

figma.connect(Input, HORIZONTAL_URL, {
  variant: { State: 'Default' },
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

figma.connect(Input, HORIZONTAL_URL, {
  variant: { State: 'Disabled' },
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

figma.connect(Input, HORIZONTAL_URL, {
  variant: { State: 'Error' },
  props: {
    hint: figma.boolean('Show Hint', { true: 'Hint text', false: undefined }),
    error: figma.boolean('Show Error', {
      true: 'Error message',
      false: undefined,
    }),
  },
  example: ({ hint, error }) => (
    <Form layout='horizontal'>
      <Form.Field hint={hint} error={error}>
        <Form.Label>Label</Form.Label>
        <Input multiline rows={4} status='error' placeholder='Placeholder' />
      </Form.Field>
    </Form>
  ),
})
