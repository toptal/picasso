import React, { createRef, useState } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'

import { FormCompound as Form } from '../FormCompound'
import { FinalField, useField } from './index'

const renderForm = (children: React.ReactNode) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
      {children}
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

const editAndRemount = () => {
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'y' } })
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
}

const HookInput = () => {
  const { input } = useField<string, HTMLInputElement>('a')

  return <input {...input} />
}

describe('FinalField', () => {
  it('keeps the value the user edited when it remounts', () => {
    renderForm(
      <Toggleable>
        <FinalField name='a' component='input' />
      </Toggleable>
    )

    editAndRemount()

    expect(screen.getByRole('textbox')).toHaveValue('y')
  })

  it('forwards `ref` to a string component', () => {
    const ref = createRef<HTMLInputElement>()

    renderForm(<FinalField name='a' component='input' ref={ref} />)

    expect(ref.current).toBe(screen.getByRole('textbox'))
  })

  describe('useField', () => {
    it('keeps the value the user edited when the field remounts', () => {
      renderForm(
        <Toggleable>
          <HookInput />
        </Toggleable>
      )

      editAndRemount()

      expect(screen.getByRole('textbox')).toHaveValue('y')
    })
  })
})
