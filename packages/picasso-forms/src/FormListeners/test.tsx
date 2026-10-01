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

const renderWithExternallyChanged = (
  initialValues: Record<string, unknown>,
  { toggleable = false } = {}
) => {
  const formRef: { current?: FormApi } = {}
  const CaptureForm = () => {
    formRef.current = useForm()

    return null
  }
  const listener = (
    <ExternallyChanged name='firstName'>
      {externallyChanged => (
        <span data-testid='externally-changed'>
          {String(externallyChanged)}
        </span>
      )}
    </ExternallyChanged>
  )

  render(
    <Form onSubmit={jest.fn()} initialValues={initialValues}>
      <CaptureForm />
      <Form.Input name='firstName' placeholder='First name' />
      {toggleable ? <Toggleable>{listener}</Toggleable> : listener}
    </Form>
  )

  return {
    changeFromOutside: (value: unknown) =>
      act(() => {
        formRef.current?.change('firstName', value)
      }),
    getExternallyChanged: () =>
      screen.getByTestId('externally-changed').textContent,
  }
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

  it('ExternallyChanged reports the first change made away from the field', () => {
    const { changeFromOutside, getExternallyChanged } =
      renderWithExternallyChanged({ firstName: 'Bruce' })

    changeFromOutside('Clark')

    expect(getExternallyChanged()).toBe('true')
  })

  it('ExternallyChanged does not report a change made in the field', () => {
    const { getExternallyChanged } = renderWithExternallyChanged({
      firstName: 'Bruce',
    })

    fireEvent.focus(getInput())
    fireEvent.change(getInput(), { target: { value: 'Clark' } })

    expect(getExternallyChanged()).toBe('false')
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

    it('OnChange does not fire again for a field that started as null', () => {
      const handleChange = jest.fn()

      render(
        <Form onSubmit={jest.fn()} initialValues={{ firstName: null }}>
          <Toggleable>
            <OnChange<string | null> name='firstName'>{handleChange}</OnChange>
            <Form.Input name='firstName' placeholder='First name' />
          </Toggleable>
        </Form>
      )

      fireEvent.change(getInput(), { target: { value: 'Clark' } })
      handleChange.mockClear()
      remount()

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('OnChange alone reports changes from the stored value for a field that started as null', () => {
      const handleChange = jest.fn()

      render(
        <Form onSubmit={jest.fn()} initialValues={{ firstName: null }}>
          <Form.Input name='firstName' placeholder='First name' />
          <Toggleable>
            <OnChange<string | null> name='firstName'>{handleChange}</OnChange>
          </Toggleable>
        </Form>
      )

      fireEvent.change(getInput(), { target: { value: 'Clark' } })
      handleChange.mockClear()
      remount()

      expect(handleChange).not.toHaveBeenCalled()

      fireEvent.change(getInput(), { target: { value: 'Diana' } })

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('Diana', 'Clark')
    })

    it('ExternallyChanged does not report the remount of a field that started as null', () => {
      const { changeFromOutside, getExternallyChanged } =
        renderWithExternallyChanged({ firstName: null }, { toggleable: true })

      fireEvent.focus(getInput())
      fireEvent.change(getInput(), { target: { value: 'Clark' } })
      fireEvent.blur(getInput())
      remount()

      expect(getExternallyChanged()).toBe('false')

      changeFromOutside('Diana')

      expect(getExternallyChanged()).toBe('true')
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
