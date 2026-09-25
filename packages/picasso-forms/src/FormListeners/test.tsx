import React, { useState } from 'react'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FormApi } from 'final-form'
import { useForm } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import { ExternallyChanged, OnBlur, OnChange, OnFocus } from './index'

const renderWithListener = (listener: React.ReactNode) =>
  render(
    <Form onSubmit={jest.fn()}>
      <Form.Input name='firstName' placeholder='First name' />
      {listener}
    </Form>
  )

const getInput = () => screen.getByPlaceholderText('First name')

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

const remount = () => {
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
}

describe('form listeners', () => {
  it('OnChange reports the new and the previous value', () => {
    const handleChange = jest.fn()

    renderWithListener(
      <OnChange<string> name='firstName'>{handleChange}</OnChange>
    )

    fireEvent.change(getInput(), { target: { value: 'Bruce' } })

    expect(handleChange).toHaveBeenCalledWith('Bruce', '')
  })

  it('OnFocus and OnBlur report the field gaining and losing focus', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()

    renderWithListener(
      <>
        <OnFocus name='firstName'>{handleFocus}</OnFocus>
        <OnBlur name='firstName'>{handleBlur}</OnBlur>
      </>
    )

    fireEvent.focus(getInput())
    expect(handleFocus).toHaveBeenCalledTimes(1)
    expect(handleBlur).not.toHaveBeenCalled()

    fireEvent.blur(getInput())
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('ExternallyChanged renders whether the value changed away from the field', () => {
    renderWithListener(
      <ExternallyChanged name='firstName'>
        {externallyChanged => <span>{String(externallyChanged)}</span>}
      </ExternallyChanged>
    )

    expect(screen.getByText('false')).toBeInTheDocument()
  })

  it("OnChange placed before its field keeps the field's `beforeSubmit`", async () => {
    const handleSubmit = jest.fn()

    render(
      <Form onSubmit={handleSubmit} initialValues={{ firstName: 'Bruce' }}>
        <OnChange<string> name='firstName'>{jest.fn()}</OnChange>
        <Form.Input
          name='firstName'
          beforeSubmit={() => false}
          placeholder='First name'
        />
        <button type='submit'>submit</button>
      </Form>
    )

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'submit' }))
    })

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  describe('when the listener remounts', () => {
    it('OnChange placed before its field does not fire again', () => {
      const handleChange = jest.fn()

      render(
        <Form onSubmit={jest.fn()} initialValues={{ firstName: 'Bruce' }}>
          <Toggleable>
            <OnChange<string> name='firstName'>{handleChange}</OnChange>
            <Form.Input name='firstName' placeholder='First name' />
          </Toggleable>
        </Form>
      )

      fireEvent.change(getInput(), { target: { value: 'Clark' } })
      handleChange.mockClear()
      remount()

      expect(handleChange).not.toHaveBeenCalled()
    })

    it("OnChange alone keeps the field's value", () => {
      const formRef: { current?: FormApi } = {}
      const CaptureForm = () => {
        formRef.current = useForm()

        return null
      }

      render(
        <Form onSubmit={jest.fn()} initialValues={{ firstName: 'Bruce' }}>
          <CaptureForm />
          <Toggleable>
            <OnChange<string> name='firstName'>{jest.fn()}</OnChange>
          </Toggleable>
        </Form>
      )

      act(() => {
        formRef.current?.change('firstName', 'Clark')
      })
      remount()

      expect(formRef.current?.getState().values.firstName).toBe('Clark')
    })
  })

  describe('types', () => {
    // Type-checked by `pnpm typecheck:react19`, which lists this file in
    // tsconfig.react19.json's `files`
    it('types the listener props', () => {
      const typed = (
        <>
          <OnChange<string> name='firstName'>
            {(value, previous) => {
              const next: string = value
              const before: string = previous

              expect(typeof next).toBe(typeof before)
            }}
          </OnChange>
          {/* @ts-expect-error `name` is required */}
          <OnBlur>{() => {}}</OnBlur>
          {/* @ts-expect-error `children` takes no argument */}
          <OnFocus name='firstName'>{(value: string) => value}</OnFocus>
        </>
      )

      expect(typed).toBeDefined()
    })
  })
})
