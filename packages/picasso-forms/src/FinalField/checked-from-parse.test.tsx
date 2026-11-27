import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FieldRenderProps, UseFieldConfig } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import { FinalField, useField } from './index'

type CheckboxConfig = Pick<UseFieldConfig, 'format' | 'parse' | 'type'>

// A string-boolean pair, as Staff Portal's relocation fields store it, whose
// `parse` maps the checkbox's `checked` only
const STRING_BOOLEAN: CheckboxConfig = {
  type: 'checkbox',
  format: value => value === 'true',
  parse: checked => (checked ? 'true' : 'false'),
}

// The same storage, with a `parse` that maps the stored string too
const PARSED_STRING_BOOLEAN: CheckboxConfig = {
  type: 'checkbox',
  parse: value =>
    typeof value === 'boolean' ? String(value) : value === 'true',
}

const CheckboxInput = ({ input }: FieldRenderProps<boolean>) => (
  <input
    type='checkbox'
    name={input.name}
    checked={input.checked}
    onChange={input.onChange}
  />
)

const HookCheckbox = ({ config }: { config: CheckboxConfig }) => (
  <CheckboxInput {...useField('relocation', config)} />
)

// A group checkbox whose pair converts the ids
const LanguageCheckbox = () => (
  <CheckboxInput
    {...useField('languages', {
      type: 'checkbox',
      value: 10,
      format: (ids?: number[]) => ids?.map(String),
      parse: (ids?: string[]) => ids?.map(Number),
    })}
  />
)

const getRelocationFields = (config: CheckboxConfig) =>
  [
    [
      'function `children`',
      <FinalField name='relocation' {...config}>
        {props => <CheckboxInput {...props} />}
      </FinalField>,
    ],
    [
      '`render`',
      <FinalField
        name='relocation'
        {...config}
        render={props => <CheckboxInput {...props} />}
      />,
    ],
    [
      'a `component`',
      <FinalField name='relocation' {...config} component={CheckboxInput} />,
    ],
    [
      'a string `component`',
      <FinalField name='relocation' {...config} component='input' />,
    ],
    ['`useField`', <HookCheckbox config={config} />],
  ] as const

const renderRelocation = (field: React.ReactNode, relocation: string) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={{ relocation }}>
      {field}
    </Form>
  )

// react-final-form 7.0.1 derives a checkbox's `checked` from `parse(value)`
describe('a checkbox with a custom `parse`', () => {
  it.each(getRelocationFields(STRING_BOOLEAN))(
    'renders a stored "false" checked through %s, as `parse` turns it into "true"',
    (_, field) => {
      renderRelocation(field, 'false')

      expect(screen.getByRole('checkbox')).toBeChecked()
    }
  )

  describe('that maps the stored value too', () => {
    it.each(getRelocationFields(PARSED_STRING_BOOLEAN))(
      'renders a stored "false" unchecked through %s',
      (_, field) => {
        renderRelocation(field, 'false')

        expect(screen.getByRole('checkbox')).not.toBeChecked()
      }
    )

    it.each(getRelocationFields(PARSED_STRING_BOOLEAN))(
      'lets the user tick and untick it through %s',
      (_, field) => {
        renderRelocation(field, 'false')

        fireEvent.click(screen.getByRole('checkbox'))

        expect(screen.getByRole('checkbox')).toBeChecked()

        fireEvent.click(screen.getByRole('checkbox'))

        expect(screen.getByRole('checkbox')).not.toBeChecked()
      }
    )
  })

  it('forwards `ref` to a string `component`', () => {
    const ref = createRef<HTMLInputElement>()

    renderRelocation(
      <FinalField
        name='relocation'
        {...PARSED_STRING_BOOLEAN}
        component='input'
        ref={ref}
      />,
      'false'
    )

    expect(ref.current).toBe(screen.getByRole('checkbox'))
  })

  it('compares the parsed value with the `value` of a checkbox that has one', () => {
    render(
      <Form onSubmit={jest.fn()} initialValues={{ languages: [10] }}>
        <LanguageCheckbox />
      </Form>
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
