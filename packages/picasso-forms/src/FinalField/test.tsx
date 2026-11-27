/* eslint-disable max-lines-per-function */
import React, { StrictMode, createRef, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { FormApi } from 'final-form'
import { createForm } from 'final-form'
import { Form as FinalForm, useForm } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import { FinalField, useField } from './index'

const renderForm = (
  children: React.ReactNode,
  props: { destroyOnUnregister?: boolean } = {}
) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }} {...props}>
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

// Toggleable, rendering its children again from a layout effect when it
// toggles, as a layout effect or `useSyncExternalStore` above a field can.
// React renders that update before the ones the field's mount effects queue.
// The children are a function, so that the field renders again too
const RerenderingToggleable = ({
  children,
}: {
  children: () => React.ReactNode
}) => {
  const [mounted, setMounted] = useState(true)
  const [, setRenders] = useState(0)

  useIsomorphicLayoutEffect(() => {
    setRenders(renders => renders + 1)
  }, [mounted])

  return (
    <>
      {mounted && children()}
      <button type='button' onClick={() => setMounted(current => !current)}>
        toggle
      </button>
    </>
  )
}

// Every value it rendered since it mounted
const RenderedValues = ({ value }: { value: unknown }) => {
  const values = useRef<unknown[]>([])

  values.current.push(value)

  return <output>{values.current.join(' ')}</output>
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

const HookInputValues = () => {
  const { input } = useField<string, HTMLInputElement>('a')

  return (
    <>
      <input {...input} />
      <RenderedValues value={input.value} />
    </>
  )
}

const DirtyInput = () => {
  const { input, meta } = useField<string, HTMLInputElement>('a')

  return (
    <>
      <input {...input} />
      <FirstValue value={meta.dirty} />
    </>
  )
}

const Later = ({ children }: { children: React.ReactNode }) => {
  const [shown, setShown] = useState(false)

  return (
    <>
      {shown && children}
      <button type='button' onClick={() => setShown(true)}>
        show
      </button>
    </>
  )
}

// A field without an `initialValue`, which keeps the field entry with nothing
// stored
const Reader = () => {
  const { input } = useField<string>('b')

  return <span>{`read ${input.value}`}</span>
}

const Seeded = () => {
  const { input } = useField<string>('b', { initialValue: 'seeded' })

  return <FirstValue value={input.value} />
}

const ItemLabel = () => {
  const { input } = useField<string>('list[0].label')

  return <FirstValue value={input.value} />
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

  it('renders the stored value on every render after a remount that a layout effect above renders again', () => {
    renderForm(
      <RerenderingToggleable>
        {() => (
          <FinalField name='a'>
            {({ input }) => (
              <>
                <input {...input} />
                <RenderedValues value={input.value} />
              </>
            )}
          </FinalField>
        )}
      </RerenderingToggleable>
    )

    editAndRemount()

    expect(screen.getByRole('status')).toHaveTextContent(/^y( y)*$/)
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

    it('renders the stored value on every render after a remount that a layout effect above renders again', () => {
      renderForm(
        <RerenderingToggleable>
          {() => <HookInputValues />}
        </RerenderingToggleable>
      )

      editAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent(/^y( y)*$/)
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

    it('renders the stored value without registering when the render never commits', () => {
      // `renderToString` renders without committing. jsdom's `window` makes
      // the hooks pick layout effects, which React warns about there
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

        expect(html).toContain('<output>y</output>')
        expect(form.getRegisteredFields()).not.toContain('a')
      } finally {
        consoleError.mockRestore()
      }
    })

    it('reports an edited value as dirty on the first render after a remount', () => {
      renderForm(
        <Toggleable>
          <DirtyInput />
        </Toggleable>
      )

      editAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent('true')
    })

    it('renders an item the form added after it mounted on its first render', () => {
      const form = createForm<{ list: { label: string }[] }>({
        onSubmit: jest.fn(),
        initialValues: { list: [] },
      })

      form.change('list', [{ label: 'added' }])
      render(
        <FinalForm
          form={form}
          onSubmit={jest.fn()}
          render={() => <ItemLabel />}
        />
      )

      expect(screen.getByRole('status')).toHaveTextContent('added')
    })

    it('renders its own `initialValue` on the first render when another field keeps the name empty', () => {
      const consoleError = jest.spyOn(console, 'error')

      renderForm(
        <>
          <Reader />
          <Later>
            <Seeded />
          </Later>
        </>
      )
      fireEvent.click(screen.getByRole('button', { name: 'show' }))

      expect(screen.getByRole('status')).toHaveTextContent('seeded')
      expect(screen.getByText('read seeded')).toBeInTheDocument()
      expect(consoleError).not.toHaveBeenCalled()
      consoleError.mockRestore()
    })

    it('renders `initialValues` on the first render after a remount under `destroyOnUnregister`, which refills the field', () => {
      renderForm(
        <Toggleable>
          <HookInput />
        </Toggleable>,
        { destroyOnUnregister: true }
      )

      editAndRemount()

      expect(screen.getByRole('status')).toHaveTextContent('x')
      expect(screen.getByRole('textbox')).toHaveValue('x')
    })
  })
})
