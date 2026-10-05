import React, { StrictMode, createRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FormApi } from 'final-form'
import { createForm } from 'final-form'
import type { FieldRenderProps } from 'react-final-form'
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

    // The server path, where a render can't yield, is in server.test.tsx
    it('leaves nothing registered once a render that never commits times out', async () => {
      jest.useFakeTimers()

      // `renderToString` renders without committing. jsdom's `window` makes
      // the claim pick a layout effect, which React warns about there
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      try {
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

        expect(html).toContain('<output>y</output>')
        // A yielding render could still be rendering, so the hold outlasts it
        expect(form.getRegisteredFields()).toContain('a')

        jest.runOnlyPendingTimers()

        expect(form.getRegisteredFields()).not.toContain('a')
      } finally {
        consoleError.mockRestore()
        jest.useRealTimers()
      }
    })
  })

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
})
