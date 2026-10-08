import React, { useState } from 'react'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FormApi } from 'final-form'
import { useForm } from 'react-final-form'

import type { FormConfigProps } from '../FormConfig'
import { FormCompound as Form } from '../FormCompound'
import type { Props as RadioGroupProps } from '../RadioGroup'

const renderFormRadio = (
  { required, name }: RadioGroupProps,
  formConfig: FormConfigProps = {}
) =>
  render(
    <Form.ConfigProvider value={formConfig}>
      <Form onSubmit={() => {}} initialValues={{ color: '#ffe4b5' }}>
        <Form.RadioGroup
          name={name}
          label="What's your favorite color?"
          required={required}
        >
          <Form.Radio label='Crimson' value='#ed143d' />
          <Form.Radio label='Moccasin' value='#ffe4b5' />
        </Form.RadioGroup>
      </Form>
    </Form.ConfigProvider>
  )

describe('FormRadio', () => {
  it('renders', () => {
    const { container } = renderFormRadio({
      name: 'color',
    })

    expect(container).toMatchSnapshot()
  })

  it('required with asterisk', () => {
    const { container } = renderFormRadio(
      {
        name: 'color',
        required: true,
      },
      {
        requiredVariant: 'asterisk',
      }
    )

    expect(container).toMatchSnapshot()
  })
})

describe('FormRadio with a field of its own', () => {
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

  it('keeps its stored value when it remounts', () => {
    const formRef: { current?: FormApi } = {}
    const CaptureForm = () => {
      formRef.current = useForm()

      return null
    }

    render(
      <Form onSubmit={() => {}} initialValues={{ size: 'small' }}>
        <CaptureForm />
        <Toggleable>
          <Form.Radio name='size' label='Small' value='small' />
          <Form.Radio name='size' label='Large' value='large' />
        </Toggleable>
      </Form>
    )

    act(() => {
      formRef.current?.change('size', 'large')
    })
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

    expect(screen.getByLabelText('Large')).toBeChecked()
    expect(formRef.current?.getState().values.size).toBe('large')
  })

  it('moves to a field of its own when a new `name` takes it out of its group', () => {
    const formRef: { current?: FormApi } = {}
    const CaptureForm = () => {
      formRef.current = useForm()

      return null
    }
    const renderRadio = (name?: string) => (
      <Form onSubmit={() => {}}>
        <CaptureForm />
        <Form.RadioGroup name='group'>
          <Form.Radio name={name} label='Small' value='small' />
        </Form.RadioGroup>
      </Form>
    )
    const { rerender } = render(renderRadio())

    rerender(renderRadio('size'))

    expect(screen.getByLabelText('Small')).toBeInTheDocument()
    expect(formRef.current?.getRegisteredFields()).toContain('size')
  })
})
