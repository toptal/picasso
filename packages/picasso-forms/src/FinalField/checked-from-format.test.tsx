import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FieldRenderProps } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import { FinalField, useField } from './index'

// A string-boolean pair, as Staff Portal's relocation fields store it
const STRING_BOOLEAN = {
  type: 'checkbox',
  format: (value: unknown) => value === 'true',
  parse: (checked: unknown) => (checked ? 'true' : 'false'),
}

const CheckboxInput = ({ input }: FieldRenderProps<boolean>) => (
  <input
    type='checkbox'
    name={input.name}
    checked={input.checked}
    onChange={input.onChange}
  />
)

const HookCheckbox = () => (
  <CheckboxInput {...useField('relocation', STRING_BOOLEAN)} />
)

// A group checkbox whose pair converts the ids, where upstream compares them
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

const RELOCATION_FIELDS = [
  [
    'function `children`',
    <FinalField name='relocation' {...STRING_BOOLEAN}>
      {props => <CheckboxInput {...props} />}
    </FinalField>,
  ],
  [
    '`render`',
    <FinalField
      name='relocation'
      {...STRING_BOOLEAN}
      render={props => <CheckboxInput {...props} />}
    />,
  ],
  [
    'a `component`',
    <FinalField
      name='relocation'
      {...STRING_BOOLEAN}
      component={CheckboxInput}
    />,
  ],
  [
    'a string `component`',
    <FinalField name='relocation' {...STRING_BOOLEAN} component='input' />,
  ],
  ['`useField`', <HookCheckbox />],
] as const

const renderRelocation = (field: React.ReactNode, relocation: string) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={{ relocation }}>
      {field}
    </Form>
  )

// react-final-form 7.0.1 derives `checked` from `parse`, which turns a stored
// 'false' into 'true'
describe('a checkbox with a custom `format`', () => {
  it.each(RELOCATION_FIELDS)(
    'renders a stored "false" unchecked through %s',
    (_, field) => {
      renderRelocation(field, 'false')

      expect(screen.getByRole('checkbox')).not.toBeChecked()
    }
  )

  it.each(RELOCATION_FIELDS)(
    'renders a stored "true" checked through %s',
    (_, field) => {
      renderRelocation(field, 'true')

      expect(screen.getByRole('checkbox')).toBeChecked()
    }
  )

  it.each(RELOCATION_FIELDS)(
    'lets the user untick it through %s',
    (_, field) => {
      renderRelocation(field, 'true')

      fireEvent.click(screen.getByRole('checkbox'))

      expect(screen.getByRole('checkbox')).not.toBeChecked()
    }
  )

  it('forwards `ref` to a string `component`', () => {
    const ref = createRef<HTMLInputElement>()

    renderRelocation(
      <FinalField
        name='relocation'
        {...STRING_BOOLEAN}
        component='input'
        ref={ref}
      />,
      'false'
    )

    expect(ref.current).toBe(screen.getByRole('checkbox'))
  })

  it("keeps upstream's `checked` for a checkbox with its own `value`", () => {
    render(
      <Form onSubmit={jest.fn()} initialValues={{ languages: [10] }}>
        <LanguageCheckbox />
      </Form>
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
