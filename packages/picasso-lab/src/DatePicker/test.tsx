import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { Tooltip } from '@toptal/picasso'

import DatePicker, { Props } from './DatePicker'

describe('DatePicker', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('default render', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <DatePicker value={date} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('custom day rendering', () => {
    const date = new Date('12-12-2019')

    const { getByPlaceholderText, getByText } = render(
      <DatePicker
        placeholder='dateInput'
        value={date}
        onChange={() => {}}
        renderDay={({ key, children }) => {
          return (
            <Tooltip key={key} content='tooltip content'>
              {children}
            </Tooltip>
          )
        }}
      />
    )

    const input = getByPlaceholderText('dateInput')

    fireEvent.click(input)

    const day15 = getByText(/15/)

    // this line leads to a warning, wrapping into `act` doesn't help
    fireEvent.mouseOver(day15)

    // wait for tooltip's "enterDelay"
    jest.advanceTimersByTime(600)

    const tooltip = getByText('tooltip content')
    expect(tooltip).toBeInTheDocument()
  })

  test('custom day rendering', () => {
    const date = new Date('2015-12-12')
    const handleChange = jest.fn()

    const { getByPlaceholderText } = render(
      <DatePicker placeholder='input' value={date} onChange={handleChange} />
    )

    const input = getByPlaceholderText('input')

    fireEvent.change(input, { target: { value: '' } })

    expect(handleChange).toBeCalledWith(null)
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    return render(<DatePicker {...props} />)
  }
})
