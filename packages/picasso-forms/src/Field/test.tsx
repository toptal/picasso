import React, { useState } from 'react'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import { Button } from '@toptal/picasso-button'
import type { FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'

import { FormCompound as Form } from '../FormCompound'
import { FieldArray } from '../FieldArray'
import { scrollTo } from '../utils/scroll-to'

jest.mock('../utils/scroll-to', () => ({ scrollTo: jest.fn() }))

const ToggleableInput = ({
  name,
  required,
}: {
  name: string
  required?: boolean
}) => {
  const [mounted, setMounted] = useState(true)

  return (
    <>
      {mounted && (
        <Form.Input name={name} required={required} placeholder='field' />
      )}
      <Button onClick={() => setMounted(current => !current)}>toggle</Button>
    </>
  )
}

const toggle = () => {
  fireEvent.click(screen.getByText('toggle'))
}

// Radios and checkboxes render react-final-form's `Field` instead of going
// through Picasso's `Field`; the group above them is what holds the claim
const ToggleableChildren = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(true)

  return (
    <>
      {mounted && children}
      <Button onClick={() => setMounted(current => !current)}>toggle</Button>
    </>
  )
}

// Seeds `c` with `form.change()` before the field mounts over it
const SeededLater = () => {
  const [mounted, setMounted] = useState(false)

  return (
    <Form onSubmit={jest.fn()} initialValues={{ c: 'initial' }}>
      {({ form }) => (
        <>
          {mounted && <Form.Input name='c' placeholder='field' />}
          <Button
            onClick={() => {
              form.change('c', '')
              setMounted(true)
            }}
          >
            seed
          </Button>
        </>
      )}
    </Form>
  )
}

describe('Field', () => {
  describe('when a field unmounts and remounts', () => {
    it('keeps the value the user edited', () => {
      render(
        <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
          <ToggleableInput name='a' />
        </Form>
      )

      fireEvent.change(screen.getByPlaceholderText('field'), {
        target: { value: 'y' },
      })

      toggle()
      toggle()

      expect(screen.getByPlaceholderText('field')).toHaveValue('y')
    })
  })

  describe('when a field mounts over a value the form was already given', () => {
    it('keeps the seeded value instead of the initial one', () => {
      render(<SeededLater />)

      fireEvent.click(screen.getByText('seed'))

      expect(screen.getByPlaceholderText('field')).toHaveValue('')
    })
  })

  describe('when the form sets `destroyOnUnregister`', () => {
    it('drops the value on unmount, as final-form does without the workaround', () => {
      let formApi: FormApi<{ a: string }> | undefined

      render(
        <Form
          destroyOnUnregister
          onSubmit={jest.fn()}
          initialValues={{ a: 'x' }}
        >
          {({ form }) => {
            formApi = form

            return <ToggleableInput name='a' />
          }}
        </Form>
      )

      fireEvent.change(screen.getByPlaceholderText('field'), {
        target: { value: 'y' },
      })

      toggle()

      expect(formApi?.getState().values.a).toBeUndefined()
    })
  })

  describe('when a radio or checkbox group remounts', () => {
    it('keeps the radio the user selected in a group', () => {
      let formApi: FormApi<{ r: string }> | undefined

      render(
        <Form onSubmit={jest.fn()} initialValues={{ r: 'a' }}>
          {({ form }) => {
            formApi = form

            return (
              <ToggleableChildren>
                <Form.RadioGroup name='r'>
                  <Form.Radio value='a' label='A' />
                  <Form.Radio value='b' label='B' />
                </Form.RadioGroup>
              </ToggleableChildren>
            )
          }}
        </Form>
      )

      fireEvent.click(screen.getByLabelText('B'))
      toggle()
      toggle()

      expect(formApi?.getState().values.r).toBe('b')
      expect(screen.getByLabelText('B')).toBeChecked()
    })

    it('keeps the checkbox the user toggled in a group', () => {
      let formApi: FormApi<{ c: string[] }> | undefined

      render(
        <Form onSubmit={jest.fn()} initialValues={{ c: ['x'] }}>
          {({ form }) => {
            formApi = form

            return (
              <ToggleableChildren>
                <Form.CheckboxGroup name='c'>
                  <Form.Checkbox value='x' label='X' />
                  <Form.Checkbox value='y' label='Y' />
                </Form.CheckboxGroup>
              </ToggleableChildren>
            )
          }}
        </Form>
      )

      fireEvent.click(screen.getByLabelText('Y'))
      toggle()
      toggle()

      expect(formApi?.getState().values.c).toEqual(['x', 'y'])
    })
  })

  describe('when a FieldArray drops an item', () => {
    it('shifts the remaining positional values instead of restoring a stale one', () => {
      render(
        <Form
          onSubmit={jest.fn()}
          mutators={{ ...arrayMutators }}
          initialValues={{ items: [{ label: 'one' }, { label: 'two' }] }}
        >
          <FieldArray<{ label: string }> name='items'>
            {({ fields }) => (
              <>
                {fields.map((fieldName, index) => (
                  <Form.Input
                    key={fieldName}
                    name={`${fieldName}.label`}
                    placeholder={`item-${index}`}
                  />
                ))}
                <Button onClick={() => fields.remove(0)}>remove first</Button>
              </>
            )}
          </FieldArray>
        </Form>
      )

      expect(screen.getByPlaceholderText('item-0')).toHaveValue('one')
      expect(screen.getByPlaceholderText('item-1')).toHaveValue('two')

      fireEvent.click(screen.getByText('remove first'))

      expect(screen.getByPlaceholderText('item-0')).toHaveValue('two')
      expect(screen.queryByPlaceholderText('item-1')).not.toBeInTheDocument()
    })
  })

  describe('after a field unmounts', () => {
    it('still lets a form-level error on the unmounted field block submit', async () => {
      const handleSubmit = jest.fn()

      render(
        <Form
          onSubmit={handleSubmit}
          initialValues={{ a: 'x' }}
          validate={values => (values.a === 'y' ? { a: 'not y' } : {})}
        >
          <ToggleableInput name='a' />
          <Button type='submit'>submit</Button>
        </Form>
      )

      fireEvent.change(screen.getByPlaceholderText('field'), {
        target: { value: 'y' },
      })

      toggle()

      await act(async () => {
        fireEvent.click(screen.getByText('submit'))
      })

      // nothing is registered for `a` any more; the form-level error still
      // blocks the submit and the scroll-to-error decorator finds no element
      expect(handleSubmit).not.toHaveBeenCalled()
      expect(scrollTo).not.toHaveBeenCalled()
    })

    it('leaves `getRegisteredFields` as final-form reports it', () => {
      let formApi: FormApi<{ a: string }> | undefined

      render(
        <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
          {({ form }) => {
            formApi = form

            return <ToggleableInput name='a' />
          }}
        </Form>
      )

      toggle()

      // the claim is released as soon as the field has mounted, so nothing
      // outlives the field itself
      expect(formApi?.getRegisteredFields()).not.toContain('a')
    })

    it('does not let a hidden required field block submit', async () => {
      const handleSubmit = jest.fn()

      render(
        <Form onSubmit={handleSubmit}>
          <ToggleableInput name='a' required />
          <Button type='submit'>submit</Button>
        </Form>
      )

      toggle()

      await act(async () => {
        fireEvent.click(screen.getByText('submit'))
      })

      // final-form clears a field's error only when its last subscriber goes,
      // so a claim held past the mount would strand this one
      expect(handleSubmit).toHaveBeenCalled()
    })
  })
  describe('the field configuration final-form only applies once', () => {
    // The claim creates the field entry, and final-form never re-applies a
    // field's submit hooks, `data` or `validateFields` to an entry that
    // already exists, so the claim has to carry them
    it('formats a `formatOnBlur` field that was never focused', async () => {
      const handleSubmit = jest.fn()

      render(
        <Form onSubmit={handleSubmit} initialValues={{ amount: '5.0' }}>
          <Form.Input
            name='amount'
            formatOnBlur
            format={value => Number(value).toFixed(2)}
            placeholder='amount'
          />
          <Button type='submit'>submit</Button>
        </Form>
      )

      await act(async () => {
        fireEvent.click(screen.getByText('submit'))
      })

      expect(handleSubmit).toHaveBeenCalledWith(
        { amount: '5.00' },
        expect.anything(),
        expect.anything()
      )
    })

    it('formats a `formatOnBlur` field of a radio group', async () => {
      const handleSubmit = jest.fn()

      render(
        <Form onSubmit={handleSubmit} initialValues={{ r: 'a' }}>
          <Form.RadioGroup
            name='r'
            formatOnBlur
            format={value => String(value).toUpperCase()}
          >
            <Form.Radio value='a' label='A' />
            <Form.Radio value='b' label='B' />
          </Form.RadioGroup>
          <Button type='submit'>submit</Button>
        </Form>
      )

      await act(async () => {
        fireEvent.click(screen.getByText('submit'))
      })

      expect(handleSubmit).toHaveBeenCalledWith(
        { r: 'A' },
        expect.anything(),
        expect.anything()
      )
    })

    it("runs the field's `afterSubmit`", async () => {
      const handleAfterSubmit = jest.fn()

      render(
        <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
          <Form.Input
            name='a'
            afterSubmit={handleAfterSubmit}
            placeholder='field'
          />
          <Button type='submit'>submit</Button>
        </Form>
      )

      await act(async () => {
        fireEvent.click(screen.getByText('submit'))
      })

      expect(handleAfterSubmit).toHaveBeenCalled()
    })

    it("lets the field's `beforeSubmit` block the submit", async () => {
      const handleSubmit = jest.fn()

      render(
        <Form onSubmit={handleSubmit} initialValues={{ a: 'x' }}>
          <Form.Input name='a' beforeSubmit={() => false} placeholder='field' />
          <Button type='submit'>submit</Button>
        </Form>
      )

      await act(async () => {
        fireEvent.click(screen.getByText('submit'))
      })

      expect(handleSubmit).not.toHaveBeenCalled()
    })

    it("passes the field's `data` to its state", () => {
      let formApi: FormApi<{ a: string }> | undefined

      render(
        <Form onSubmit={jest.fn()} initialValues={{ a: 'x' }}>
          {({ form }) => {
            formApi = form

            return (
              <Form.Input
                name='a'
                data={{ tag: 'from-props' }}
                placeholder='field'
              />
            )
          }}
        </Form>
      )

      expect(formApi?.getFieldState('a')?.data).toEqual(
        expect.objectContaining({ tag: 'from-props' })
      )
    })
  })
})
