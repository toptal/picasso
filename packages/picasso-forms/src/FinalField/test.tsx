import React, { StrictMode, createRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FormApi } from 'final-form'
import { createForm } from 'final-form'
import { Form as FinalForm, useForm } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import { FinalField, useField } from './index'

const renderForm = (children: React.ReactNode) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
      {children}
    </Form>
  )

const TAGGED = { tag: 'tagged' }

// Keeps the value it first renders with, as an uncontrolled editor does
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

const editAndRemount = () => {
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'y' } })
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
  fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
}

const HookInput = () => {
  const { input } = useField<string, HTMLInputElement>('a')

  return (
    <>
      <input {...input} />
      <FirstValue value={input.value} />
    </>
  )
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

  it('renders the stored value on its first render after a remount', () => {
    renderForm(
      <Toggleable>
        <FinalField name='a'>
          {({ input }) => (
            <>
              <input {...input} />
              <FirstValue value={input.value} />
            </>
          )}
        </FinalField>
      </Toggleable>
    )

    editAndRemount()

    expect(screen.getByRole('status')).toHaveTextContent('y')
  })

  it('still renders a field-level `initialValue` on its first mount', () => {
    renderForm(
      <FinalField name='b' initialValue='initial'>
        {({ input }) => <FirstValue value={input.value} />}
      </FinalField>
    )

    expect(screen.getByRole('status')).toHaveTextContent('initial')
  })

  it('keeps its `beforeSubmit` after a remount', async () => {
    const handleSubmit = jest.fn()

    render(
      <Form onSubmit={handleSubmit} initialValues={{ a: 'x' }}>
        <Toggleable>
          <FinalField name='a' component='input' beforeSubmit={() => false} />
        </Toggleable>
        <button type='submit'>submit</button>
      </Form>
    )

    editAndRemount()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'submit' }))
    })

    expect(handleSubmit).not.toHaveBeenCalled()
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

    it('renders the stored value on the first render after a remount', () => {
      renderForm(
        <Toggleable>
          <HookInput />
        </Toggleable>
      )

      editAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent('y')
    })

    it('renders its `data` on the first render', () => {
      const Tag = () => {
        const { meta } = useField('a', { data: TAGGED })

        return <FirstValue value={meta.data?.tag} />
      }

      renderForm(<Tag />)

      expect(screen.getByRole('status')).toHaveTextContent('tagged')
    })

    it('compares with its `isEqual` on the first render', () => {
      const form = createForm<{ item: { id: number } }>({
        onSubmit: jest.fn(),
        initialValues: { item: { id: 1 } },
      })
      const Pristine = () => {
        const { meta } = useField<{ id: number }>('item', {
          isEqual: (left, right) => left?.id === right?.id,
        })

        return <FirstValue value={meta.pristine} />
      }

      form.change('item', { id: 1 })
      render(
        <FinalForm
          form={form}
          onSubmit={jest.fn()}
          render={() => <Pristine />}
        />
      )

      expect(screen.getByRole('status')).toHaveTextContent('true')
    })

    it('leaves nothing registered once the field unmounts, in StrictMode', () => {
      const formRef: { current?: FormApi } = {}
      const CaptureForm = () => {
        formRef.current = useForm()

        return null
      }

      render(
        <StrictMode>
          <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
            <CaptureForm />
            <Toggleable>
              <HookInput />
            </Toggleable>
          </Form>
        </StrictMode>
      )

      editAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent('y')

      fireEvent.click(screen.getByRole('button', { name: 'toggle' }))

      expect(formRef.current?.getRegisteredFields()).not.toContain('a')
    })

    it('leaves nothing registered after a server render', async () => {
      // jsdom's `window` makes the claim pick a layout effect, which React
      // warns about on the server
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const form = createForm<{ a: string }>({
        onSubmit: jest.fn(),
        initialValues: { a: 'x' },
      })

      form.change('a', 'y')

      const html = renderToString(
        <FinalForm
          form={form}
          onSubmit={jest.fn()}
          render={() => <HookInput />}
        />
      )

      await Promise.resolve()
      consoleError.mockRestore()

      expect(html).toContain('<output>y</output>')
      expect(form.getRegisteredFields()).not.toContain('a')
    })
  })
})
