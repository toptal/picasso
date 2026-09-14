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

  describe('when a field stays registered after unmounting', () => {
    it('submits with a form-level error on the unmounted field', async () => {
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

      // the field is registered but has no element: the error blocks the
      // submit and the scroll-to-error decorator finds nothing to scroll to
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
})
