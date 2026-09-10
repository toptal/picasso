import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'

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

  describe('types', () => {
    // Not enforced by CI: no test file in this repo is type-checked.
    // `react-final-form-listeners@3.0.1` points `types` at a path it does not
    // publish, so without these declarations every listener would be `any`.
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
