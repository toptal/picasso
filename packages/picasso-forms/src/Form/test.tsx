import React from 'react'
import { fireEvent, render, waitFor, act } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso'

import type { Props } from './Form'
import { FormCompound as Form } from '../FormCompound'
import { scrollTo } from '../utils/scroll-to'

jest.mock('../utils', () => {
  const actualUtils = jest.requireActual('../utils')

  return {
    ...actualUtils,
    createScrollToErrorDecorator: jest.requireActual(
      '../utils/scroll-to-error-decorator'
    ).default,
  }
})
jest.mock('../utils/scroll-to', () => ({
  scrollTo: jest.fn(),
}))

const renderForm = (
  props: OmitInternalProps<Props> & {
    mandatory?: boolean
    showValidState?: boolean
  }
) => {
  const {
    onSubmit,
    disableScrollOnError,
    mandatory,
    showValidState,
    validateOnBlur,
  } = props

  return render(
    <Form.ConfigProvider value={{ showValidState }}>
      <Form
        data-testid='form'
        onSubmit={onSubmit}
        disableScrollOnError={disableScrollOnError}
        validateOnBlur={validateOnBlur}
      >
        <Form.Input
          name='test'
          placeholder='test input'
          required={mandatory}
          testIds={{ validIcon: 'valid-icon' }}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Form.ConfigProvider>
  )
}

interface FormData {
  skills: { value: string; text: string }[]
}

const skillOptions = [
  { value: '0', text: 'HTML' },
  { value: '1', text: 'CSS' },
  { value: '2', text: 'Javascript' },
]

const initialValues: FormData = {
  skills: [skillOptions[0]],
}

const renderTagSelectorWithInitialValue = (
  onSubmit: (values: FormData) => void
) => {
  return render(
    <Form onSubmit={values => onSubmit(values)} initialValues={initialValues}>
      <Form.TagSelector
        name='skills'
        label='Skills'
        options={skillOptions}
        inputValue=''
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

const scrollToMock = scrollTo as jest.Mock

describe('Form', () => {
  beforeEach(() => {
    scrollToMock.mockReset()
  })

  it('renders', async () => {
    const { container, getByText } = renderForm({
      onSubmit: () => {},
      mandatory: false,
    })

    await act(() => {
      fireEvent.click(getByText('Submit'))
    })

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledTimes(0)
      expect(container).toMatchSnapshot()
    })
  })

  it('renders with an error', async () => {
    const { container, getByText } = renderForm({
      onSubmit: () => Promise.resolve({ test: 'Some error' }),
      mandatory: true,
    })

    await act(() => {
      fireEvent.click(getByText('Submit'))
    })

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledTimes(1)
      expect(container).toMatchSnapshot()
    })
  })

  it('when `disableScrollOnError` is specified', async () => {
    const { getByText } = renderForm({
      onSubmit: () => ({ test: 'Some error' }),
      disableScrollOnError: true,
      mandatory: true,
    })

    await act(() => {
      fireEvent.click(getByText('Submit'))
    })

    await waitFor(() => {
      expect(scrollToMock).not.toHaveBeenCalled()
    })
  })

  describe('when validateOnBlur is enabled', () => {
    it('validates only on blur', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderForm({
        onSubmit: () => ({ test: 'Some error' }),
        disableScrollOnError: true,
        mandatory: true,
        validateOnBlur: true,
      })

      const input = getByPlaceholderText('test input')

      fireEvent.blur(input)
      expect(getByText('Please complete this field.')).toBeInTheDocument()

      fireEvent.change(input, { target: { value: 'value' } })
      expect(getByText('Please complete this field.')).toBeInTheDocument()

      fireEvent.blur(input)
      expect(queryByText('Please complete this field.')).not.toBeInTheDocument()
    })

    describe('when showValidState is enabled', () => {
      it('shows validation success when form submitted on Enter', async () => {
        const { getByPlaceholderText, getByTestId } = renderForm({
          onSubmit: () => {},
          disableScrollOnError: false,
          mandatory: true,
          showValidState: true,
          validateOnBlur: true,
        })

        const input = getByPlaceholderText('test input')

        await act(async () => {
          fireEvent.focus(input)
          fireEvent.change(input, { target: { value: 'value' } })
          fireEvent.submit(input)
        })

        await waitFor(() => {
          expect(getByTestId('valid-icon')).toBeInTheDocument()
        })
      })
    })
  })

  describe('when initial values provided to form', () => {
    it('fills TagSelector field with provided values', async () => {
      const onSubmit = jest.fn()

      const { getByText } = renderTagSelectorWithInitialValue(onSubmit)

      await act(() => {
        fireEvent.click(getByText('Submit'))
      })

      expect(onSubmit).toHaveBeenCalledWith(initialValues)
    })
  })
})
