import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import React, { useState } from 'react'
import type { FormApi } from 'final-form'
import { Field as FinalFormField, useForm } from 'react-final-form'

import Checkbox from '../Checkbox'
import { Form } from '../Form'
import type { Props } from './CheckboxGroup'
import { CheckboxGroup } from './CheckboxGroup'

const arrangeTest = ({ titleCase }: Partial<Props> = {}) =>
  render(
    <Form onSubmit={() => {}}>
      <CheckboxGroup
        required
        name='checkbox-group'
        label='Checkbox group label'
        titleCase={titleCase}
      >
        <Checkbox label='checkbox-label-0' value='checkbox-value-0' />
        <Checkbox label='checkbox-label-1' value='checkbox-value-1' />
      </CheckboxGroup>
    </Form>
  )

const FirstValue = ({ value }: { value: unknown }) => {
  const [first] = useState(value)

  return <output>{String(first)}</output>
}

const Toggleable = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(true)

  return (
    <>
      {mounted && children}
      <button type='button' onClick={() => setMounted(current => !current)}>
        toggle
      </button>
    </>
  )
}

describe('CheckboxGroup', () => {
  it('shows the label in default case', () => {
    const { getByText } = arrangeTest()

    expect(getByText('Checkbox group label')).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByText } = arrangeTest({ titleCase: true })

    expect(getByText('Checkbox Group Label')).toBeInTheDocument()
  })

  // react-final-form's own `Field` builds its first render from
  // `initialValues`; the group's claim keeps the stored state it then reads
  it("renders a checkbox's stored state once it registers after a remount", () => {
    const formRef: { current?: FormApi } = {}
    const CaptureForm = () => {
      formRef.current = useForm()

      return null
    }

    render(
      <Form onSubmit={() => {}} initialValues={{ choices: [] }}>
        <CaptureForm />
        <Toggleable>
          <CheckboxGroup name='choices'>
            <FinalFormField name='choices' type='checkbox' value='b'>
              {({ input }) => (
                <>
                  <FirstValue value={input.checked} />
                  <span>{`checked: ${String(input.checked)}`}</span>
                </>
              )}
            </FinalFormField>
          </CheckboxGroup>
        </Toggleable>
      </Form>
    )

    act(() => {
      formRef.current?.change('choices', ['b'])
    })
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

    expect(screen.getByRole('status')).toHaveTextContent('false')
    expect(screen.getByText('checked: true')).toBeInTheDocument()
  })
})
