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

  render(<TimePicker value='21:30' onChange={handleChange} {...props} />)

  return { handleChange }
}

const openPicker = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Choose time' }))

const getOption = (column: string, name: string) =>
  within(screen.getByRole('listbox', { name: column })).getByRole('option', {
    name,
  })

const getHourLabels = () =>
  within(screen.getByRole('listbox', { name: 'Hour' }))
    .getAllByRole('option')
    .map(option => option.textContent)

const pickOption = (column: string, name: string) => {
  openPicker()
  fireEvent.click(getOption(column, name))
}

const pressOnOption = (column: string, name: string, key: string) => {
  openPicker()
  act(() => getOption(column, name).focus())
  fireEvent.keyDown(getOption(column, name), { key })
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

  describe('when the clock button is clicked', () => {
    it('opens a dialog with hour and minute columns', () => {
      renderComponent()

      openPicker()

      const dialog = screen.getByRole('dialog', { name: 'Choose time' })

      expect(
        within(dialog).getByRole('listbox', { name: 'Hour' })
      ).toBeInTheDocument()
      expect(
        within(dialog).getByRole('listbox', { name: 'Minute' })
      ).toBeInTheDocument()
    })

    it('marks the hour and minute of the value as selected', () => {
      renderComponent()

      openPicker()

      expect(getOption('Hour', '21')).toHaveAttribute('aria-selected', 'true')
      expect(getOption('Minute', '30')).toHaveAttribute('aria-selected', 'true')
      expect(getOption('Hour', '09')).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('when the clock button is clicked twice', () => {
    it('closes the dialog', () => {
      renderComponent()

      openPicker()
      openPicker()

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('when an hour is picked', () => {
    it('calls onChange with the picked hour and the current minutes', () => {
      const { handleChange } = renderComponent()

      pickOption('Hour', '09')

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('09:30')
    })

    it('keeps the dialog open', () => {
      renderComponent()

      pickOption('Hour', '09')

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('shows the picked time in the field', () => {
      renderComponent()

      pickOption('Hour', '09')

      expect(screen.getByDisplayValue('09:30')).toBeInTheDocument()
    })
  })

  describe('when a minute is picked', () => {
    it('calls onChange with the current hour and the picked minutes', () => {
      const { handleChange } = renderComponent()

      pickOption('Minute', '45')

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('21:45')
    })
  })

  describe('when the field shows a 24-hour clock', () => {
    it('shows hours from 00 to 23 without an AM/PM column', () => {
      renderComponent()

      openPicker()

      expect(getHourLabels()).toEqual([
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
      ])
      expect(
        screen.queryByRole('listbox', { name: 'AM/PM' })
      ).not.toBeInTheDocument()
    })
  })

  describe('when the field shows a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('shows hours from 01 to 12 and an AM/PM column', () => {
      renderComponent()

      openPicker()

      expect(getHourLabels()).toEqual([
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ])
      expect(screen.getByRole('listbox', { name: 'AM/PM' })).toBeInTheDocument()
    })

    it('marks the 12-hour equivalent of the value as selected', () => {
      renderComponent()

      openPicker()

      expect(getOption('Hour', '09')).toHaveAttribute('aria-selected', 'true')
      expect(getOption('AM/PM', 'PM')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('when an hour is picked for an afternoon value on a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('calls onChange with the 24-hour afternoon value', () => {
      const { handleChange } = renderComponent()

      pickOption('Hour', '07')

      expect(handleChange).toHaveBeenCalledWith('19:30')
    })
  })

  describe('when 12 is picked for an afternoon value on a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('calls onChange with noon', () => {
      const { handleChange } = renderComponent({ value: '21:15' })

      pickOption('Hour', '12')

      expect(handleChange).toHaveBeenCalledWith('12:15')
    })
  })

  describe('when 12 is picked for a morning value on a 12-hour clock', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('calls onChange with midnight', () => {
      const { handleChange } = renderComponent({ value: '09:15' })

      pickOption('Hour', '12')

      expect(handleChange).toHaveBeenCalledWith('00:15')
    })
  })

  describe('when AM is picked for an afternoon value', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('calls onChange with the morning value', () => {
      const { handleChange } = renderComponent({ value: '21:15' })

      pickOption('AM/PM', 'AM')

      expect(handleChange).toHaveBeenCalledWith('09:15')
    })
  })

  describe('when PM is picked for a morning value', () => {
    beforeEach(() => {
      mockedGetHourCycle.mockReturnValue(12)
    })

    it('calls onChange with the afternoon value', () => {
      const { handleChange } = renderComponent({ value: '09:15' })

      pickOption('AM/PM', 'PM')

      expect(handleChange).toHaveBeenCalledWith('21:15')
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

    it('shows hours from 00 to 23 to match its 24-hour field', () => {
      renderComponent()

      openPicker()

      expect(getHourLabels()).toHaveLength(24)
      expect(
        screen.queryByRole('listbox', { name: 'AM/PM' })
      ).not.toBeInTheDocument()
    })
  })

  describe('when hourLabel and minuteLabel are provided', () => {
    it('names the columns with them', () => {
      renderComponent({ hourLabel: 'Stunde', minuteLabel: 'Minute(n)' })

      openPicker()

      expect(
        screen.getByRole('listbox', { name: 'Stunde' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('listbox', { name: 'Minute(n)' })
      ).toBeInTheDocument()
    })

    it('does not pass them to the input element', () => {
      renderComponent({ hourLabel: 'Stunde', minuteLabel: 'Minute(n)' })

      const input = screen.getByDisplayValue('21:30')

      expect(input).not.toHaveAttribute('hourlabel')
      expect(input).not.toHaveAttribute('minutelabel')
    })
  })

  describe('when the value is empty', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date(2026, 0, 15, 10, 25))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('marks the current time as selected', () => {
      renderComponent({ value: undefined })

      openPicker()

      expect(getOption('Hour', '10')).toHaveAttribute('aria-selected', 'true')
      expect(getOption('Minute', '25')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('when an hour is picked for an empty value', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date(2026, 0, 15, 10, 25))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('calls onChange with the picked hour and the current minute', () => {
      const { handleChange } = renderComponent({ value: undefined })

      pickOption('Hour', '14')

      expect(handleChange).toHaveBeenCalledWith('14:25')
    })
  })

  describe('when a time was picked and Escape is pressed in the field', () => {
    const setup = () => {
      const { handleChange } = renderComponent()

      pickOption('Hour', '09')
      fireEvent.keyDown(screen.getByDisplayValue('09:30'), { key: 'Escape' })

      return handleChange
    }

    it('closes the dialog', () => {
      setup()

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('restores the value from before the dialog was opened', () => {
      const handleChange = setup()

      expect(handleChange).toHaveBeenLastCalledWith('21:30')
      expect(screen.getByDisplayValue('21:30')).toBeInTheDocument()
    })
  })

  describe('when a time was picked and Enter is pressed in the field', () => {
    const setup = () => {
      const { handleChange } = renderComponent()

      pickOption('Hour', '09')
      fireEvent.keyDown(screen.getByDisplayValue('09:30'), { key: 'Enter' })

      return handleChange
    }

    it('closes the dialog', () => {
      setup()

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('keeps the picked value', () => {
      const handleChange = setup()

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(screen.getByDisplayValue('09:30')).toBeInTheDocument()
    })
  })

  describe('when clicking outside of the open dialog', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('closes the dialog', () => {
      renderComponent()

      openPicker()
      // ClickAwayListener starts listening on the next tick after it mounts
      act(() => {
        jest.runOnlyPendingTimers()
      })
      fireEvent.click(document.body)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('when disabled', () => {
    it('does not open the dialog', () => {
      renderComponent({ disabled: true })

      openPicker()

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('when read-only', () => {
    it('does not open the dialog', () => {
      renderComponent({ readOnly: true })

      openPicker()

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('when Alt+ArrowDown is pressed in the field', () => {
    const setup = () => {
      renderComponent()

      fireEvent.keyDown(screen.getByDisplayValue('21:30'), {
        key: 'ArrowDown',
        altKey: true,
      })
    }

    it('opens the dialog', () => {
      setup()

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('moves focus to the selected hour', () => {
      setup()

      expect(getOption('Hour', '21')).toHaveFocus()
    })
  })

  describe('when ArrowDown is pressed on the selected hour', () => {
    it('selects the next hour', () => {
      const { handleChange } = renderComponent()

      pressOnOption('Hour', '21', 'ArrowDown')

      expect(handleChange).toHaveBeenCalledWith('22:30')
    })

    it('moves focus to the next hour', () => {
      renderComponent()

      pressOnOption('Hour', '21', 'ArrowDown')

      expect(getOption('Hour', '22')).toHaveFocus()
    })
  })

  describe('when ArrowDown is pressed on the last hour', () => {
    it('keeps the last hour selected', () => {
      renderComponent({ value: '23:30' })

      pressOnOption('Hour', '23', 'ArrowDown')

      expect(getOption('Hour', '23')).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('when ArrowUp is pressed on the selected hour', () => {
    it('selects the previous hour', () => {
      const { handleChange } = renderComponent()

      pressOnOption('Hour', '21', 'ArrowUp')

      expect(handleChange).toHaveBeenCalledWith('20:30')
    })
  })

  describe('when Home is pressed on the selected hour', () => {
    it('selects the first hour', () => {
      const { handleChange } = renderComponent()

      pressOnOption('Hour', '21', 'Home')

      expect(handleChange).toHaveBeenCalledWith('00:30')
    })
  })

  describe('when End is pressed on the selected hour', () => {
    it('selects the last hour', () => {
      const { handleChange } = renderComponent()

      pressOnOption('Hour', '21', 'End')

      expect(handleChange).toHaveBeenCalledWith('23:30')
    })
  })

  describe('when ArrowRight is pressed on the selected hour', () => {
    it('moves focus to the selected minute', () => {
      renderComponent()

      pressOnOption('Hour', '21', 'ArrowRight')

      expect(getOption('Minute', '30')).toHaveFocus()
    })
  })

  describe('when ArrowLeft is pressed on the selected minute', () => {
    it('moves focus to the selected hour', () => {
      renderComponent()

      pressOnOption('Minute', '30', 'ArrowLeft')

      expect(getOption('Hour', '21')).toHaveFocus()
    })
  })

  describe('when Enter is pressed on the selected hour', () => {
    it('closes the dialog', () => {
      renderComponent()

      pressOnOption('Hour', '21', 'Enter')

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('returns focus to the field', () => {
      renderComponent()

      pressOnOption('Hour', '21', 'Enter')

      expect(screen.getByDisplayValue('21:30')).toHaveFocus()
    })
  })

  describe('when a time was picked and Escape is pressed inside the dialog', () => {
    const setup = () => {
      const { handleChange } = renderComponent()

      pickOption('Hour', '09')
      act(() => getOption('Hour', '09').focus())
      fireEvent.keyDown(getOption('Hour', '09'), { key: 'Escape' })

      return handleChange
    }

    it('closes the dialog', () => {
      setup()

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('restores the value from before the dialog was opened', () => {
      const handleChange = setup()

      expect(handleChange).toHaveBeenLastCalledWith('21:30')
    })

    it('returns focus to the field', () => {
      setup()

      expect(screen.getByDisplayValue('21:30')).toHaveFocus()
    })
  })
})
