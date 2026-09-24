import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import React, { useState } from 'react'
import type { FormApi } from 'final-form'
import { Field as FinalFormField, useForm } from 'react-final-form'

import Radio from '../Radio'
import { Form } from '../Form'
import type { Props } from './RadioGroup'
import { RadioGroup } from './RadioGroup'

const arrangeTest = ({ titleCase }: Partial<Props> = {}) =>
  render(
    <Form onSubmit={() => {}}>
      <RadioGroup
        required
        name='radio-group'
        label='Radio group label'
        titleCase={titleCase}
      >
        <Radio label='radio-label-0' value='radio-value-0' />
        <Radio label='radio-label-1' value='radio-value-1' />
      </RadioGroup>
    </Form>
  )

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

// Keeps the value it first renders with
const FirstValue = ({ value }: { value: unknown }) => {
  const [first] = useState(value)

  return <output>{String(first)}</output>
}

describe('RadioGroup', () => {
  it('shows the label in default case', () => {
    const { getByText } = arrangeTest()

    expect(getByText('Radio group label')).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByText } = arrangeTest({ titleCase: true })

    expect(getByText('Radio Group Label')).toBeInTheDocument()
  })

  // A grouped `Radio` renders react-final-form's own `Field`, which the group's
  // field state has to cover while it renders
  it("renders a radio's stored choice on its first render after a remount", () => {
    const formRef: { current?: FormApi } = {}
    const CaptureForm = () => {
      formRef.current = useForm()

      return null
    }

    render(
      <Form onSubmit={() => {}} initialValues={{ choice: 'a' }}>
        <CaptureForm />
        <Toggleable>
          <RadioGroup name='choice'>
            <FinalFormField name='choice' type='radio' value='b'>
              {({ input }) => <FirstValue value={input.checked} />}
            </FinalFormField>
          </RadioGroup>
        </Toggleable>
      </Form>
    )

    act(() => {
      formRef.current?.change('choice', 'b')
    })
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

    expect(screen.getByRole('status')).toHaveTextContent('true')
  })
})
