import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@toptal/picasso-test-utils'
import type { AnyObject } from 'final-form'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso-button'

import type { FormWrapperProps, FullFormProps, Props } from './Form'
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

// Wrappers that forward props: `formProps.subscription` is
// `FormSubscription | undefined`, which matches neither precise overload,
// because overload resolution does not distribute over a union
const InlineForm = <T extends AnyObject>(props: FormWrapperProps<T>) => (
  <Form<T> {...props} />
)

// A wrapper that forwards no subscription keeps the non-optional render props
const StrictForm = (props: Omit<FullFormProps, 'subscription'>) => (
  <Form {...props} />
)

const scrollToMock = scrollTo as jest.Mock

// React 19 rethrows the errors of a render under `act()` as one AggregateError,
// React 18 throws the error itself
const catchRenderErrors = (renderComponent: () => unknown): Error[] => {
  try {
    renderComponent()
  } catch (error) {
    const { errors } = error as { errors?: Error[] }

    return errors ?? [error as Error]
  }

  return []
}

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

  describe('when a field renders without a name', () => {
    it('throws a descriptive error instead of failing inside final-form', () => {
      // React also reports the thrown render error on the console
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const errors = catchRenderErrors(() =>
        render(
          <Form onSubmit={jest.fn()} initialValues={{ test: 'value' }}>
            {/* the missing `name` compiles: react-final-form's FieldProps index
                signature erases the required prop through forwardRef */}
            <Form.Input placeholder='test input' />
          </Form>
        )
      )

      expect(errors.map(({ message }) => message)).toEqual(
        expect.arrayContaining([
          expect.stringContaining('rendered without a `name`'),
        ])
      )

      consoleError.mockRestore()
    })
  })

  // The type assertions below are not enforced by CI: no test file in this
  // repo is type-checked. Run `tsc --noEmit` over this file to check them.
  describe('render props of a function child', () => {
    it('fills the state final-form subscribes to, and types it non-optional', () => {
      render(
        <Form onSubmit={jest.fn()} initialValues={{ test: 'value' }}>
          {({ submitting, pristine, initialValues: formInitialValues }) => {
            const isSubmitting: boolean = submitting
            const values: Partial<AnyObject> = formInitialValues

            return <span>{`${isSubmitting} ${pristine} ${values.test}`}</span>
          }}
        </Form>
      )

      expect(screen.getByText('false true value')).toBeInTheDocument()
    })

    it('reports an absent `initialValues` as an empty object', () => {
      render(
        <Form onSubmit={jest.fn()}>
          {({ initialValues: formInitialValues }) => (
            <span>{JSON.stringify(formInitialValues)}</span>
          )}
        </Form>
      )

      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it('leaves the keys an explicit subscription omits undefined', () => {
      render(
        <Form onSubmit={jest.fn()} subscription={{ submitting: true }}>
          {({ submitting, initialValues: formInitialValues }) => {
            // @ts-expect-error a literal subscription keeps `submitting` optional
            const wrong: boolean = submitting

            return <span>{`${wrong} ${formInitialValues}`}</span>
          }}
        </Form>
      )

      expect(screen.getByText('false undefined')).toBeInTheDocument()
    })

    it('accepts a wrapper forwarding a subscription it cannot resolve', () => {
      render(
        <InlineForm onSubmit={jest.fn()}>
          {({ submitting }) => {
            // @ts-expect-error a wrapper cannot promise its caller omitted `subscription`
            const wrong: boolean = submitting

            return <span>{`wrapped ${wrong}`}</span>
          }}
        </InlineForm>
      )

      expect(screen.getByText('wrapped false')).toBeInTheDocument()
    })

    it('keeps the state non-optional for a wrapper that forwards no subscription', () => {
      render(
        <StrictForm onSubmit={jest.fn()}>
          {({ submitting }) => {
            const isSubmitting: boolean = submitting

            return <span>{`strict ${isSubmitting}`}</span>
          }}
        </StrictForm>
      )

      expect(screen.getByText('strict false')).toBeInTheDocument()
    })
  })
})
