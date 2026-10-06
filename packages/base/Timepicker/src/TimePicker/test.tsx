import React from 'react'
import {
  act,
  render,
  fireEvent,
  screen,
  within,
} from '@toptal/picasso-test-utils'
import { detect } from 'detect-browser'

import type { Props } from './TimePicker'
import { TimePicker } from './TimePicker'
import { getHourCycle } from './utils/get-hour-cycle'

jest.mock('./utils/get-hour-cycle')
jest.mock('detect-browser')

const mockedGetHourCycle = getHourCycle as jest.MockedFunction<
  typeof getHourCycle
>
const mockedDetect = detect as jest.MockedFunction<typeof detect>

const renderComponent = (props: Partial<Props> = {}) => {
  const handleChange = jest.fn()

  render(
    <TimePicker
      value='21:30'
      minuteStep={30}
      onChange={handleChange}
      {...props}
    />
  )

  return { handleChange }
}

const getField = (value = '21:30') => screen.getByDisplayValue(value)

const openList = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Choose time' }))

const openListWithKeyboard = (value = '21:30') =>
  fireEvent.keyDown(getField(value), { key: 'ArrowDown', altKey: true })

const queryList = () => screen.queryByRole('listbox', { name: 'Choose time' })

const getOptions = () =>
  within(screen.getByRole('listbox', { name: 'Choose time' })).getAllByRole(
    'option'
  )

const getOption = (name: string) => screen.getByRole('option', { name })

const getOptionLabels = () => getOptions().map(option => option.textContent)

const pressOnOption = (name: string, key: string) => {
  openList()
  act(() => getOption(name).focus())
  fireEvent.keyDown(getOption(name), { key })
}

// eslint-disable-next-line max-lines-per-function, max-statements
describe('TimePicker', () => {
  beforeEach(() => {
    mockedGetHourCycle.mockReturnValue(24)
    mockedDetect.mockReturnValue(null)
  })

  it('renders', () => {
    const time = '21:00'

    const { container } = render(
      <TimePicker value={time} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  it('custom time rendering', () => {
    const time = '22:50'
    const nextTime = '18:30'
    const handleChange = jest.fn()

    const { getByDisplayValue } = render(
      <TimePicker value={time} onChange={handleChange} />
    )

    const input = getByDisplayValue(time)

    fireEvent.change(input, { target: { value: nextTime } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  describe('when invalid time is entered', () => {
    it('calls onChange with empty value', () => {
      const time = '09:00'
      const handleChange = jest.fn()
      const { getByDisplayValue } = render(
        <TimePicker value={time} onChange={handleChange} />
      )

      const input = getByDisplayValue(time)

      fireEvent.change(input, { target: { value: '12:--' } })
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('')

      const newTime = '12:12'

      fireEvent.change(input, { target: { value: newTime } })
      expect(handleChange).toHaveBeenCalledTimes(2)
      expect(handleChange).toHaveBeenCalledWith(newTime)
    })
  })

  describe('when minuteStep is not provided', () => {
    it('renders no button for a time list', () => {
      renderComponent({ minuteStep: undefined })

      expect(
        screen.queryByRole('button', { name: 'Choose time' })
      ).not.toBeInTheDocument()
    })
  })

  describe('when minuteStep is provided and the clock button is clicked', () => {
    it('opens a list of times at that interval', () => {
      renderComponent({ minuteStep: 30 })

      openList()

      expect(getOptionLabels()).toHaveLength(48)
      expect(getOptionLabels().slice(0, 3)).toEqual(['00:00', '00:30', '01:00'])
      expect(getOptionLabels().slice(-1)).toEqual(['23:30'])
    })

    it('marks the time of the value as selected', () => {
      renderComponent()

      openList()

      expect(getOption('21:30')).toHaveAttribute('aria-selected', 'true')
      expect(getOption('09:00')).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('when minuteStep is 15', () => {
    it('offers a time every quarter of an hour', () => {
      renderComponent({ minuteStep: 15 })

      openList()

      expect(getOptionLabels()).toHaveLength(96)
      expect(getOptionLabels().slice(0, 4)).toEqual([
        '00:00',
        '00:15',
        '00:30',
        '00:45',
      ])
    })
  })

  describe('when the clock button is clicked twice', () => {
    it('closes the list', () => {
      renderComponent()

      openList()
      openList()

      expect(queryList()).not.toBeInTheDocument()
    })
  })

  describe('when a time is picked', () => {
    const setup = () => {
      const { handleChange } = renderComponent()

      openList()
      fireEvent.click(getOption('09:00'))

      return handleChange
    }

    it('calls onChange with the picked time', () => {
      const handleChange = setup()

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('09:00')
    })

    it('closes the list', () => {
      setup()

      expect(queryList()).not.toBeInTheDocument()
    })

    it('shows the picked time in the field', () => {
      setup()

      expect(getField('09:00')).toBeInTheDocument()
    })
  })

  describe('when the value is not on the step', () => {
    it('marks no time as selected', () => {
      renderComponent({ value: '21:07', minuteStep: 15 })

      openList()

      expect(
        getOptions().filter(
          option => option.getAttribute('aria-selected') === 'true'
        )
      ).toHaveLength(0)
    })

    it('moves keyboard focus to the nearest time', () => {
      renderComponent({ value: '21:07', minuteStep: 15 })

      openListWithKeyboard('21:07')

      expect(getOption('21:00')).toHaveFocus()
    })
  })

  describe('when the field shows a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('labels the times with AM and PM', () => {
      renderComponent()

      openList()

      expect(getOptionLabels().slice(0, 3)).toEqual([
        '12:00 AM',
        '12:30 AM',
        '01:00 AM',
      ])
      expect(getOptionLabels().slice(-1)).toEqual(['11:30 PM'])
    })

    it('marks the 12-hour label of the value as selected', () => {
      renderComponent()

      openList()

      expect(getOption('09:30 PM')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('when a PM time is picked on a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('calls onChange with the 24-hour value', () => {
      const { handleChange } = renderComponent()

      openList()
      fireEvent.click(getOption('07:00 PM'))

      expect(handleChange).toHaveBeenCalledWith('19:00')
    })
  })

  describe('when the browser is Safari and the locale uses a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
      mockedDetect.mockReturnValue({
        name: 'safari',
        version: '17.0.0',
        os: 'Mac OS',
        type: 'browser',
      })
    })

    it('labels the times in 24-hour format to match its field', () => {
      renderComponent()

      openList()

      expect(getOptionLabels().slice(-1)).toEqual(['23:30'])
    })
  })

  describe('when a time is picked for an empty value', () => {
    it('calls onChange with the picked time', () => {
      const { handleChange } = renderComponent({ value: undefined })

      openList()
      fireEvent.click(getOption('14:30'))

      expect(handleChange).toHaveBeenCalledWith('14:30')
    })
  })

  describe('when Escape is pressed in the field with the list open', () => {
    const setup = () => {
      const { handleChange } = renderComponent()

      openList()
      fireEvent.keyDown(getField(), { key: 'Escape' })

      return handleChange
    }

    it('closes the list', () => {
      setup()

      expect(queryList()).not.toBeInTheDocument()
    })

    it('keeps the value', () => {
      const handleChange = setup()

      expect(handleChange).not.toHaveBeenCalled()
      expect(getField()).toBeInTheDocument()
    })
  })

  describe('when clicking outside of the open list', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('closes the list', () => {
      renderComponent()

      openList()
      // ClickAwayListener starts listening on the next tick after it mounts
      act(() => {
        jest.runOnlyPendingTimers()
      })
      fireEvent.click(document.body)

      expect(queryList()).not.toBeInTheDocument()
    })
  })

  describe('when disabled', () => {
    it('does not open the list', () => {
      renderComponent({ disabled: true })

      openList()

      expect(queryList()).not.toBeInTheDocument()
    })
  })

  describe('when the field becomes disabled while the list is open', () => {
    it('closes the list', () => {
      const { rerender } = render(
        <TimePicker value='21:30' minuteStep={30} onChange={jest.fn()} />
      )

      openList()
      expect(queryList()).toBeInTheDocument()

      rerender(
        <TimePicker
          value='21:30'
          minuteStep={30}
          onChange={jest.fn()}
          disabled
        />
      )

      expect(queryList()).not.toBeInTheDocument()
    })
  })

  describe('when read-only', () => {
    it('does not open the list', () => {
      renderComponent({ readOnly: true })

      openList()

      expect(queryList()).not.toBeInTheDocument()
    })
  })

  describe('when onKeyDown is provided', () => {
    it('calls it for key presses in the field', () => {
      const handleKeyDown = jest.fn()

      renderComponent({ onKeyDown: handleKeyDown })

      fireEvent.keyDown(getField(), { key: 'a' })

      expect(handleKeyDown).toHaveBeenCalledTimes(1)
      expect(handleKeyDown.mock.calls[0][0].key).toBe('a')
    })

    it('still opens the list on Alt+ArrowDown', () => {
      renderComponent({ onKeyDown: jest.fn() })

      openListWithKeyboard()

      expect(queryList()).toBeInTheDocument()
    })
  })

  describe('when Alt+ArrowDown is pressed in the field with the list open', () => {
    const pressAltArrowDownWithListOpen = () => {
      openList()

      return fireEvent.keyDown(getField(), { key: 'ArrowDown', altKey: true })
    }

    it('keeps a single list open', () => {
      renderComponent()

      pressAltArrowDownWithListOpen()

      expect(
        screen.getAllByRole('listbox', { name: 'Choose time' })
      ).toHaveLength(1)
    })

    it('prevents the browser from opening its own picker', () => {
      renderComponent()

      const defaultNotPrevented = pressAltArrowDownWithListOpen()

      expect(defaultNotPrevented).toBe(false)
    })

    it('moves keyboard focus into the list', () => {
      renderComponent()

      pressAltArrowDownWithListOpen()

      expect(getOption('21:30')).toHaveFocus()
    })
  })

  describe('when Space is pressed in the field', () => {
    it('opens the list with keyboard focus on the selected time', () => {
      renderComponent()

      fireEvent.keyDown(getField(), { key: ' ' })

      expect(queryList()).toBeInTheDocument()
      expect(getOption('21:30')).toHaveFocus()
    })

    it('prevents the browser from opening its own picker', () => {
      renderComponent()

      const defaultNotPrevented = fireEvent.keyDown(getField(), { key: ' ' })

      expect(defaultNotPrevented).toBe(false)
    })
  })

  describe('when Space is pressed in the field with the list open', () => {
    it('keeps a single list open and focuses it', () => {
      renderComponent()

      openList()
      fireEvent.keyDown(getField(), { key: ' ' })

      expect(
        screen.getAllByRole('listbox', { name: 'Choose time' })
      ).toHaveLength(1)
      expect(getOption('21:30')).toHaveFocus()
    })
  })

  describe('when Alt+ArrowDown is pressed in the field', () => {
    it('opens the list', () => {
      renderComponent()

      openListWithKeyboard()

      expect(queryList()).toBeInTheDocument()
    })

    it('moves focus to the selected time', () => {
      renderComponent()

      openListWithKeyboard()

      expect(getOption('21:30')).toHaveFocus()
    })
  })

  describe('when ArrowDown is pressed on a time', () => {
    it('moves focus to the next time', () => {
      renderComponent()

      pressOnOption('21:30', 'ArrowDown')

      expect(getOption('22:00')).toHaveFocus()
    })

    it('keeps the value', () => {
      const { handleChange } = renderComponent()

      pressOnOption('21:30', 'ArrowDown')

      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('when ArrowUp is pressed on a time', () => {
    it('moves focus to the previous time', () => {
      renderComponent()

      pressOnOption('21:30', 'ArrowUp')

      expect(getOption('21:00')).toHaveFocus()
    })
  })

  describe('when ArrowDown is pressed on the last time', () => {
    it('keeps focus on the last time', () => {
      renderComponent()

      pressOnOption('23:30', 'ArrowDown')

      expect(getOption('23:30')).toHaveFocus()
    })
  })

  describe('when Home is pressed on a time', () => {
    it('moves focus to the first time', () => {
      renderComponent()

      pressOnOption('21:30', 'Home')

      expect(getOption('00:00')).toHaveFocus()
    })
  })

  describe('when End is pressed on a time', () => {
    it('moves focus to the last time', () => {
      renderComponent()

      pressOnOption('21:30', 'End')

      expect(getOption('23:30')).toHaveFocus()
    })
  })

  describe('when Enter is pressed on a time', () => {
    it('calls onChange with that time', () => {
      const { handleChange } = renderComponent()

      pressOnOption('09:00', 'Enter')

      expect(handleChange).toHaveBeenCalledWith('09:00')
    })

    it('closes the list', () => {
      renderComponent()

      pressOnOption('09:00', 'Enter')

      expect(queryList()).not.toBeInTheDocument()
    })

    it('returns focus to the field', () => {
      renderComponent()

      pressOnOption('09:00', 'Enter')

      expect(getField('09:00')).toHaveFocus()
    })
  })

  describe('when Escape is pressed on a time', () => {
    it('closes the list', () => {
      renderComponent()

      pressOnOption('09:00', 'Escape')

      expect(queryList()).not.toBeInTheDocument()
    })

    it('keeps the value', () => {
      const { handleChange } = renderComponent()

      pressOnOption('09:00', 'Escape')

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('returns focus to the field', () => {
      renderComponent()

      pressOnOption('09:00', 'Escape')

      expect(getField()).toHaveFocus()
    })
  })
})
