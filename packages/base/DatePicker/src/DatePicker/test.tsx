/* eslint-disable max-lines-per-function */
import React from 'react'
import { act, fireEvent, render } from '@toptal/picasso-test-utils'
import { Tooltip } from '@toptal/picasso-tooltip'

import type { Props } from './DatePicker'
import { DatePicker } from './DatePicker'
import type { DatePickerInputCustomValueParser } from './'

const testIds = {
  calendar: 'calendar',
  input: 'input',
}

const FAR_EAST_TIMEZONE = 'Asia/Tokyo'
const NEW_YORK_TIMEZONE = 'America/New_York'
const SHANGHAI_TIMEZONE = 'Asia/Shanghai'
const LOS_ANGELES_TIMEZONE = 'America/Los_Angeles'

/**
 * Both sides of the midnight boundary for the offsets the component realistically
 * meets, including both DST states of the two zones that observe it. Tests run
 * under `TZ=UTC`, so every case is one where the UTC date and the target zone's
 * date disagree — the situation that makes a date land on the wrong day.
 *
 * Each literal carries the offset the zone genuinely has at that instant. Getting
 * that wrong does not fail the test, it silently moves the case off the boundary
 * it is meant to probe, so keep literal and zone in step when editing.
 */
const MIDNIGHT_BOUNDARY_CASES = [
  {
    label: 'Tokyo +09:00, just after midnight',
    date: '2020-06-25T00:00:00+09:00',
    timezone: FAR_EAST_TIMEZONE,
    expectedSelectedDate: '25',
    expectedInputValue: 'Jun 25, 2020',
  },
  {
    label: 'Tokyo +09:00, one second before midnight',
    date: '2020-06-24T23:59:59+09:00',
    timezone: FAR_EAST_TIMEZONE,
    expectedSelectedDate: '24',
    expectedInputValue: 'Jun 24, 2020',
  },
  {
    label: 'Shanghai +08:00, just after midnight',
    date: '2020-06-25T00:00:00+08:00',
    timezone: SHANGHAI_TIMEZONE,
    expectedSelectedDate: '25',
    expectedInputValue: 'Jun 25, 2020',
  },
  {
    label: 'Shanghai +08:00, one second before midnight',
    date: '2020-06-24T23:59:59+08:00',
    timezone: SHANGHAI_TIMEZONE,
    expectedSelectedDate: '24',
    expectedInputValue: 'Jun 24, 2020',
  },
  {
    label: 'Los Angeles -08:00 (PST), just after midnight',
    date: '2020-01-25T00:00:00-08:00',
    timezone: LOS_ANGELES_TIMEZONE,
    expectedSelectedDate: '25',
    expectedInputValue: 'Jan 25, 2020',
  },
  {
    label: 'Los Angeles -08:00 (PST), one second before midnight',
    date: '2020-01-24T23:59:59-08:00',
    timezone: LOS_ANGELES_TIMEZONE,
    expectedSelectedDate: '24',
    expectedInputValue: 'Jan 24, 2020',
  },
  {
    label: 'Los Angeles -07:00 (PDT), just after midnight',
    date: '2020-06-25T00:00:00-07:00',
    timezone: LOS_ANGELES_TIMEZONE,
    expectedSelectedDate: '25',
    expectedInputValue: 'Jun 25, 2020',
  },
  {
    label: 'Los Angeles -07:00 (PDT), one second before midnight',
    date: '2020-06-24T23:59:59-07:00',
    timezone: LOS_ANGELES_TIMEZONE,
    expectedSelectedDate: '24',
    expectedInputValue: 'Jun 24, 2020',
  },
  {
    label: 'New York -04:00 (EDT), just after midnight',
    date: '2020-06-25T00:00:00-04:00',
    timezone: NEW_YORK_TIMEZONE,
    expectedSelectedDate: '25',
    expectedInputValue: 'Jun 25, 2020',
  },
  {
    label: 'New York -04:00 (EDT), one second before midnight',
    date: '2020-06-24T23:59:59-04:00',
    timezone: NEW_YORK_TIMEZONE,
    expectedSelectedDate: '24',
    expectedInputValue: 'Jun 24, 2020',
  },
  {
    label: 'New York -05:00 (EST), just after midnight',
    date: '2020-01-25T00:00:00-05:00',
    timezone: NEW_YORK_TIMEZONE,
    expectedSelectedDate: '25',
    expectedInputValue: 'Jan 25, 2020',
  },
  {
    label: 'New York -05:00 (EST), one second before midnight',
    date: '2020-01-24T23:59:59-05:00',
    timezone: NEW_YORK_TIMEZONE,
    expectedSelectedDate: '24',
    expectedInputValue: 'Jan 24, 2020',
  },
]

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
        displayDateFormat: 'MMM|d|yyyy',
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
        value: [new Date(2020, 11, 24), new Date(2020, 11, 27)],
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
        displayDateFormat: 'MMM|d|yyyy',
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
        editDateFormat: 'MM|dd|yyyy',
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
        autoComplete: 'on',
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
        value: new Date(2020, 6, 24, 18),
      })

      expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
        'value',
        `Jul 25, 2020`
      )
    })

    it.each(MIDNIGHT_BOUNDARY_CASES)(
      'should display date in given timezone across a midnight boundary ($label)',
      ({ date, timezone, expectedInputValue }) => {
        const { getByPlaceholderText } = renderDatePicker({
          ...defaultProps,
          timezone,
          value: new Date(date),
        })

        expect(getByPlaceholderText(defaultProps.placeholder)).toHaveAttribute(
          'value',
          expectedInputValue
        )
      }
    )

    it('should work within interval', () => {
      const MIN_DATE = new Date(2020, 6, 10)
      const MAX_DATE = new Date(2020, 6, 25)

      const handleChange = jest.fn()

      const { getByPlaceholderText } = renderDatePicker({
        ...defaultProps,
        minDate: MIN_DATE,
        maxDate: MAX_DATE,
        onChange: handleChange,
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
        onChange: handleChange,
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
        onChange: handleChange,
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

    describe('when `range` property is set', () => {
      it('should resets value when input content removed', async () => {
        const { getByTestId } = renderDatePicker({
          ...defaultProps,
          range: true,
          value: new Date(2021, 11, 29),
        })

        const input = getByTestId(testIds.input)

        expect(input).toHaveAttribute('value', 'Dec 29, 2021')

        await act(() => {
          fireEvent.change(input, {
            target: { value: '' },
          })
          fireEvent.blur(input)
        })

        expect(input).toHaveAttribute('value', '')
      })
    })

    describe('should work with `parseInputValue`', () => {
      describe('when parser returns parsed date', () => {
        let parseInputValue: DatePickerInputCustomValueParser

        beforeEach(() => {
          parseInputValue = jest
            .fn()
            .mockImplementation(() => new Date(2021, 0, 1))
        })

        it('calls `onChange` handler with the parsed date', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            parseInputValue,
            onChange: handleChange,
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(() => {
            fireEvent.change(input, {
              target: { value: 'some random text' },
            })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledWith(new Date(2021, 0, 1))
        })
      })

      describe('when parser returns parsed date outside of the `min/max` dates range', () => {
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
            onChange: handleChange,
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(() => {
            fireEvent.change(input, {
              target: { value: 'some random text' },
            })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(1)
          expect(handleChange).toHaveBeenCalledTimes(0)
        })
      })

      describe('when parser cannot parse date', () => {
        const parseInputValue: DatePickerInputCustomValueParser = () => {
          return undefined
        }

        it('does not call `onChange` handler', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            parseInputValue,
            onChange: handleChange,
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(() => {
            fireEvent.change(input, {
              target: { value: 'some random text' },
            })
            fireEvent.blur(input)
          })

          expect(handleChange).toHaveBeenCalledTimes(0)
        })
      })

      describe('when `range` property is set', () => {
        const parseInputValue = jest.fn()

        it('does not call `parseInputValue` function', async () => {
          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            range: true,
            parseInputValue,
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(() => {
            fireEvent.change(input, {
              target: { value: 'some random text' },
            })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(0)
        })
      })

      describe('when valid string date value is typed', () => {
        const parseInputValue = jest.fn()

        it('does not call `parseInputValue` function', async () => {
          const handleChange = jest.fn()

          const { getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            parseInputValue,
            onChange: handleChange,
          })

          const input = getByPlaceholderText(defaultProps.placeholder)

          await act(() => {
            fireEvent.change(input, { target: { value: '07-26-2021' } })
            fireEvent.blur(input)
          })

          expect(parseInputValue).toHaveBeenCalledTimes(0)
          expect(handleChange).toHaveBeenCalledWith(new Date(2021, 6, 26))
        })
      })
    })

    describe('when `enableReset` option is passed', () => {
      it('should reset input value on reset button click', async () => {
        const { getByPlaceholderText, getByRole } = renderDatePicker({
          ...defaultProps,
          enableReset: true,
        })

        const input = getByPlaceholderText(defaultProps.placeholder)

        fireEvent.focus(input)
        fireEvent.click(getByRole('reset', { hidden: true }))

        expect(input).toHaveAttribute('value', '')
      })
    })
  })

  describe('Calendar', () => {
    it.each(MIDNIGHT_BOUNDARY_CASES)(
      'should display date in given timezone ($label)',
      ({ date, timezone, expectedSelectedDate }) => {
        const { getByPlaceholderText } = renderDatePicker({
          ...defaultProps,
          timezone,
          value: new Date(date),
        })

        fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))

        expect(getSelectedDay()).toHaveTextContent(expectedSelectedDate)
      }
    )

    it.each(MIDNIGHT_BOUNDARY_CASES)(
      'should display date in given timezone after day click ($label)',
      async ({ date, timezone }) => {
        const { getByPlaceholderText, getByText } = renderDatePicker({
          ...defaultProps,
          timezone,
          value: new Date(date),
        })

        fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))

        const day15 = getByText(/15/)

        fireEvent.click(day15)

        fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))

        expect(getSelectedDay()).toHaveTextContent('15')
      }
    )

    describe('when `enableReset` option is passed', () => {
      it('should not close calendar on `reset` button click', async () => {
        const { getByRole, getByPlaceholderText } = renderDatePicker({
          ...defaultProps,
          enableReset: true,
        })

        fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))
        fireEvent.click(getByRole('reset', { hidden: true }))

        expect(getSelectedDay()).toBeInTheDocument()
      })

      it('should not open calendar on `reset` button click', async () => {
        const { getByRole, queryByTestId, getByPlaceholderText, getByText } =
          renderDatePicker({
            ...defaultProps,
            enableReset: true,
          })

        const input = getByPlaceholderText(defaultProps.placeholder)

        fireEvent.focus(input)

        const day15 = getByText(/15/)

        fireEvent.click(day15)

        expect(queryByTestId(testIds.calendar)).not.toBeInTheDocument()

        fireEvent.click(getByRole('reset', { hidden: true }))

        expect(input).toHaveAttribute('value', '')
        expect(queryByTestId(testIds.calendar)).not.toBeInTheDocument()
      })
    })

    describe('when `footer` option is passed', () => {
      it('should appear a footer at the bottom of the calendar', async () => {
        const { getByText, getByPlaceholderText } = renderDatePicker({
          ...defaultProps,
          footer: <>Footer</>,
        })

        fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))

        expect(getByText('Footer')).toBeInTheDocument()
      })

      describe('when `footerBackgroundColor` option is passed', () => {
        it('should appear a custom color footer at the bottom of the calendar', async () => {
          const { getByText, getByPlaceholderText } = renderDatePicker({
            ...defaultProps,
            footer: <>Footer</>,
            footerBackgroundColor: 'red',
          })

          fireEvent.focus(getByPlaceholderText(defaultProps.placeholder))

          expect(getByText('Footer')).toHaveStyle({ backgroundColor: 'red' })
        })
      })
    })
  })

  const defaultProps = {
    onChange: () => {},
    value: new Date(2020, 11, 24),
    placeholder: 'Pick a date',
  }

  // paired with `data-calendar-day` because the calendar portals out of the
  // render container and Base UI stamps `data-selected` on select and tab
  // items too — the pair can only match a calendar day
  const getSelectedDay = () =>
    document.querySelector('[data-calendar-day][data-selected]')

  const renderDatePicker = (props: Props = defaultProps) => {
    return render(<DatePicker testIds={testIds} {...props} />)
  }
})
