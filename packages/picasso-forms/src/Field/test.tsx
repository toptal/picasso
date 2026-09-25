import React, { useState } from 'react'
import { act, fireEvent, render, screen } from '@toptal/picasso-test-utils'
import { Button } from '@toptal/picasso-button'
import type { FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { useForm } from 'react-final-form'

import { FormCompound as Form } from '../FormCompound'
import { FieldArray } from '../FieldArray'
import { scrollTo } from '../utils/scroll-to'

jest.mock('../utils/scroll-to', () => ({ scrollTo: jest.fn() }))

type FormProps = React.ComponentProps<typeof Form>

const renderForm = (
  ui: React.ReactNode,
  props: Omit<Partial<FormProps>, 'onSubmit'> = {}
) => {
  const handleSubmit = jest.fn()
  const formRef: { current?: FormApi } = {}
  const CaptureForm = () => {
    formRef.current = useForm()

    return null
  }

  render(
    <Form onSubmit={handleSubmit} {...props}>
      <CaptureForm />
      {ui}
      <Button type='submit'>submit</Button>
    </Form>
  )

  return {
    handleSubmit,
    getForm: () => formRef.current,
    submit: () =>
      act(async () => {
        fireEvent.click(screen.getByText('submit'))
      }),
  }
}

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

const editField = (value: string) => {
  fireEvent.change(screen.getByPlaceholderText('field'), { target: { value } })
}

const ToggleableChildren = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(true)

  return (
    <>
      {mounted && children}
      <Button onClick={() => setMounted(current => !current)}>toggle</Button>
    </>
  )
}

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
      renderForm(<ToggleableInput name='a' />, { initialValues: { a: 'x' } })

      editField('y')
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
      const { getForm } = renderForm(<ToggleableInput name='a' />, {
        destroyOnUnregister: true,
        initialValues: { a: 'x' },
      })

      editField('y')
      toggle()

      expect(getForm()?.getState().values.a).toBeUndefined()
    })
  })

  describe('when a radio or checkbox group remounts', () => {
    it('keeps the radio the user selected in a group', () => {
      const { getForm } = renderForm(
        <ToggleableChildren>
          <Form.RadioGroup name='r'>
            <Form.Radio value='a' label='A' />
            <Form.Radio value='b' label='B' />
          </Form.RadioGroup>
        </ToggleableChildren>,
        { initialValues: { r: 'a' } }
      )

      fireEvent.click(screen.getByLabelText('B'))
      toggle()
      toggle()

      expect(getForm()?.getState().values.r).toBe('b')
      expect(screen.getByLabelText('B')).toBeChecked()
    })

    it('keeps the checkbox the user toggled in a group', () => {
      const { getForm } = renderForm(
        <ToggleableChildren>
          <Form.CheckboxGroup name='c'>
            <Form.Checkbox value='x' label='X' />
            <Form.Checkbox value='y' label='Y' />
          </Form.CheckboxGroup>
        </ToggleableChildren>,
        { initialValues: { c: ['x'] } }
      )

      fireEvent.click(screen.getByLabelText('Y'))
      toggle()
      toggle()

      expect(getForm()?.getState().values.c).toEqual(['x', 'y'])
    })
  })

  describe('when a FieldArray drops an item', () => {
    it('shifts the remaining positional values instead of restoring a stale one', () => {
      renderForm(
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
        </FieldArray>,
        {
          mutators: { ...arrayMutators },
          initialValues: { items: [{ label: 'one' }, { label: 'two' }] },
        }
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
      const { handleSubmit, submit } = renderForm(
        <ToggleableInput name='a' />,
        {
          initialValues: { a: 'x' },
          validate: values => (values.a === 'y' ? { a: 'not y' } : {}),
        }
      )

      editField('y')
      toggle()
      await submit()

      expect(handleSubmit).not.toHaveBeenCalled()
      expect(scrollTo).not.toHaveBeenCalled()
    })

    it('leaves `getRegisteredFields` as final-form reports it', () => {
      const { getForm } = renderForm(<ToggleableInput name='a' />, {
        initialValues: { a: 'x' },
      })

      toggle()

      expect(getForm()?.getRegisteredFields()).not.toContain('a')
    })

    it('does not let a hidden required field block submit', async () => {
      const { handleSubmit, submit } = renderForm(
        <ToggleableInput name='a' required />
      )

      toggle()
      await submit()

      expect(handleSubmit).toHaveBeenCalled()
    })
  })

  describe('the field configuration final-form only applies once', () => {
    it('formats a `formatOnBlur` field that was never focused', async () => {
      const { handleSubmit, submit } = renderForm(
        <Form.Input
          name='amount'
          formatOnBlur
          format={(value: unknown) => Number(value).toFixed(2)}
          placeholder='amount'
        />,
        { initialValues: { amount: '5.0' } }
      )

      await submit()

      expect(handleSubmit).toHaveBeenCalledWith(
        { amount: '5.00' },
        expect.anything(),
        expect.anything()
      )
    })

    it('formats a `formatOnBlur` field of a radio group', async () => {
      const { handleSubmit, submit } = renderForm(
        <Form.RadioGroup
          name='r'
          formatOnBlur
          format={value => String(value).toUpperCase()}
        >
          <Form.Radio value='a' label='A' />
          <Form.Radio value='b' label='B' />
        </Form.RadioGroup>,
        { initialValues: { r: 'a' } }
      )

      await submit()

      expect(handleSubmit).toHaveBeenCalledWith(
        { r: 'A' },
        expect.anything(),
        expect.anything()
      )
    })

    it("runs the field's `afterSubmit`", async () => {
      const handleAfterSubmit = jest.fn()
      const { submit } = renderForm(
        <Form.Input
          name='a'
          afterSubmit={handleAfterSubmit}
          placeholder='field'
        />,
        { initialValues: { a: 'x' } }
      )

      await submit()

      expect(handleAfterSubmit).toHaveBeenCalled()
    })

    it("lets the field's `beforeSubmit` block the submit", async () => {
      const { handleSubmit, submit } = renderForm(
        <Form.Input name='a' beforeSubmit={() => false} placeholder='field' />,
        { initialValues: { a: 'x' } }
      )

      await submit()

      expect(handleSubmit).not.toHaveBeenCalled()
    })

    it("passes the field's `data` to its state", () => {
      const { getForm } = renderForm(
        <Form.Input
          name='a'
          data={{ tag: 'from-props' }}
          placeholder='field'
        />,
        { initialValues: { a: 'x' } }
      )

      expect(getForm()?.getFieldState('a')?.data).toEqual(
        expect.objectContaining({ tag: 'from-props' })
      )
    })
  })
})
