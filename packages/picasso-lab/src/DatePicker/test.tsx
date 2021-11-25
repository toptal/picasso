/* eslint-disable max-lines-per-function */
import { Tooltip } from '@toptal/picasso'
import { act, fireEvent, render } from '@toptal/picasso/test-utils'
import React from 'react'

import DatePicker, { Props } from './DatePicker'
import { DatePickerInputCustomValueParser } from './'

// eslint-disable-next-line max-lines-per-function
describe('DatePicker', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('renders', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <DatePicker value={date} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  it('custom day rendering', () => {
    const date = new Date('12-12-2019')

    const { getByPlaceholderText, getByText } = render(
      <DatePicker
        placeholder='dateInput'
        value={date}
        onChange={() => {}}
        renderDay={({ key, children }) => (
          <Tooltip key={key} content='tooltip content'>
            {children}
          </Tooltip>
        )}
      />
    )

    const input = getByPlaceholderText('dateInput')

    fireEvent.click(input)

    const day15 = getByText(/15/)

    fireEvent.mouseOver(day15)

    act(() => {
      // wait for tooltip's "enterDelay"
      jest.advanceTimersByTime(600)
    })

    const tooltip = getByText('tooltip content')

    expect(tooltip).toBeInTheDocument()
  })

  describe('Input', () => {
    it('should display date in default displayDateFormat', () => {
      const { getByPlaceholderText } = renderDatePicker()

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'value',
        'Dec 24, 2020'
      )
    })

    it('should display date in given displayDateFormat', () => {
      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        displayDateFormat: 'MMM|d|yyyy'
      })

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'value',
        'Dec|24|2020'
      )
    })

    it('should display date range in default displayDateFormat', () => {
      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        range: true,
        value: [new Date(2020, 11, 24), new Date(2020, 11, 27)]
      })

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'value',
        'Dec 24, 2020 - Dec 27, 2020'
      )
    })

    it('should display date range in given displayDateFormat', () => {
      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        range: true,
        value: [new Date(2020, 11, 24), new Date(2020, 11, 27)],
        displayDateFormat: 'MMM|d|yyyy'
      })

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'value',
        'Dec|24|2020 - Dec|27|2020'
      )
    })

    it('should display date in default editDateFormat', () => {
      const { getByPlaceholderText } = renderDatePicker()
      const input = getByPlaceholderText(defaultProps.placeholder)

      fireEvent.focus(input)

      expect(input).toHaveAttribute('value', '12-24-2020')
    })

    it('should display date in given editDateFormat', () => {
      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        editDateFormat: 'MM|dd|yyyy'
      })
      const input = getByPlaceholderText(defaultProps.placeholder)

      fireEvent.focus(input)

      expect(input).toHaveAttribute('value', '12|24|2020')
    })

    it('should turn autoComplete off by default', () => {
      const { getByPlaceholderText } = renderDatePicker()

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'autocomplete',
        'off'
      )
    })

    it('should turn autoComplete on', () => {
      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        autoComplete: 'on'
      })

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'autocomplete',
        'on'
      )
    })

    it('should display date in given timezone', () => {
      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        timezone: FAR_EAST_TIMEZONE,
        value: new Date(2020, 6, 24, 18)
      })

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'value',
        `Jul 25, 2020`
      )
    })

    it('should work within interval', () => {
      const MIN_DATE = new Date(2020, 6, 10)
      const MAX_DATE = new Date(2020, 6, 25)

      const handleChange = jest.fn()

      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        minDate: MIN_DATE,
        maxDate: MAX_DATE,
        onChange: handleChange
      })

      const input = getByPlaceholderText(defaultProps.placeholder)

      fireEvent.change(input, { target: { value: '07-09-2020' } })
      expect(handleChange).not.toHaveBeenCalled()

      fireEvent.change(input, { target: { value: '07-26-2020' } })
      expect(handleChange).not.toHaveBeenCalled()

      fireEvent.change(input, { target: { value: '07-22-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 22))

      // check min edge
      fireEvent.change(input, { target: { value: '07-10-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 10))

      // check max edge
      fireEvent.change(input, { target: { value: '07-25-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 25))
    })

    it('should work with minDate only', () => {
      const MIN_DATE = new Date(2020, 6, 10, 15, 0, 0)

      const handleChange = jest.fn()

      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        minDate: MIN_DATE,
        onChange: handleChange
      })

      const input = getByPlaceholderText(defaultProps.placeholder)

      fireEvent.change(input, { target: { value: '07-09-2020' } })
      expect(handleChange).not.toHaveBeenCalled()

      fireEvent.change(input, { target: { value: '07-22-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 22))

      // check min edge
      fireEvent.change(input, { target: { value: '07-10-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 10))
    })

    it('should work with maxDate', () => {
      const MAX_DATE = new Date(2020, 6, 25, 15, 0, 0)

      const handleChange = jest.fn()

      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        maxDate: MAX_DATE,
        onChange: handleChange
      })

      const input = getByPlaceholderText(defaultProps.placeholder)

      fireEvent.change(input, { target: { value: '07-26-2020' } })
      expect(handleChange).not.toHaveBeenCalled()

      fireEvent.change(input, { target: { value: '07-22-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 22))

      // check max edge
      fireEvent.change(input, { target: { value: '07-25-2020' } })
      expect(handleChange).toHaveBeenCalledWith(new Date(2020, 6, 25))
    })

    describe('should work with `parseInputValue`', () => {
      describe('if parser returns `Date`', () => {
        const parseInputValue: DatePickerInputCustomValueParser = jest
          .fn()
          .mockImplementation(() => {
            return new Date(2021, 0, 1)
          })

        it('calls `onChange` handler with the parsed date', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            parseInputValue,
            onChange: handleChange
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(async () => {
            await fireEvent.change(input, {
              target: { value: 'some random text' }
            })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledWith(new Date(2021, 0, 1))
        })
      })

      describe('if parser returns `Date` value outside of the `min/max` dates', () => {
        const parseInputValue: DatePickerInputCustomValueParser = jest
          .fn()
          .mockImplementation(() => {
            return new Date(2021, 0, 1)
          })

        it('does not call `onChange` handler', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            minDate: new Date(2021, 1, 1),
            parseInputValue,
            onChange: handleChange
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(async () => {
            await fireEvent.change(input, {
              target: { value: 'some random text' }
            })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledTimes(0)
        })
      })

      describe('if parser returns `undefined`', () => {
        const parseInputValue: DatePickerInputCustomValueParser = () => {
          return undefined
        }

        it('does not call `onChange` handler', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            parseInputValue,
            onChange: handleChange
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(async () => {
            await fireEvent.change(input, {
              target: { value: 'some random text' }
            })
            fireEvent.blur(input)
          })

          expect(handleChange).toHaveBeenCalledTimes(0)
        })
      })

      describe('if `range` property is set', () => {
        const parseInputValue = jest.fn()

        it('does not call `parseInputValue` function', async () => {
          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            range: true,
            parseInputValue
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(async () => {
            await fireEvent.change(input, {
              target: { value: 'some random text' }
            })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(0)
        })
      })

      describe('if valid string date value is typed', () => {
        const parseInputValue = jest.fn()

        it('does not call `parseInputValue` function', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            parseInputValue,
            onChange: handleChange
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(async () => {
            await fireEvent.change(input, { target: { value: '07-26-2021' } })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(0)
          expect(handleChange).toHaveBeenCalledWith(new Date(2021, 6, 26))
        })
      })
    })
  })

  describe('Calendar', () => {
    it('should display date in given timezone', () => {
      const { getByPlaceholderText, getByTestId } = renderDatePicker({
        ...defaultProps,
        timezone: FAR_EAST_TIMEZONE,
        value: new Date(2020, 6, 24, 18)
      })

      fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))

      expect(getByTestId('day-button-selected')).toHaveTextContent('25')
    })
  })

  const FAR_EAST_TIMEZONE = 'Asia/Tokyo'

  const defaultProps = {
    onChange: () => {},
    value: new Date(2020, 11, 24),
    placeholder: 'Pick a date'
  }

  const renderDatePicker = (props: Props = defaultProps) => {
    return render(<DatePicker {...props} />)
  }
})
