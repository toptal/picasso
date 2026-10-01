import React, { useEffect, useRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TimePickerColumn } from '../TimePickerColumn'
import type { ColumnOption } from '../TimePickerColumn'
import { padTimePart } from '../TimePicker/utils'
import type { HourCycle, Time } from '../TimePicker/utils'

export interface Props extends BaseProps {
  /** Time shown as selected */
  time: Time
  /** Whether hours run from 01 to 12 with an AM/PM column or from 00 to 23 */
  hourCycle: HourCycle
  /** Label of the hour column */
  hourLabel: string
  /** Label of the minute column */
  minuteLabel: string
  /** Moves focus to the selected hour when the columns appear */
  autoFocus?: boolean
  /** Called with the time after an hour, minute or AM/PM is picked */
  onChange: (time: Time) => void
  /** Called when the keyboard asks to close the columns */
  onClose: (options: { revert: boolean }) => void
}

const AM = 0
const PM = 1
const HALF_DAY = 12

const range = (start: number, end: number): ColumnOption[] =>
  Array.from({ length: end - start + 1 }, (_, index) => ({
    value: start + index,
    label: padTimePart(start + index),
  }))

const HOURS_24 = range(0, 23)
const HOURS_12 = range(1, 12)
const MINUTES = range(0, 59)
const PERIODS: ColumnOption[] = [
  { value: AM, label: 'AM' },
  { value: PM, label: 'PM' },
]
const PERIOD_LABEL = 'AM/PM'

const SELECTED_OPTION = '[role="option"][aria-selected="true"]'

const sectionClassName =
  'flex flex-col gap-1 border-0 border-solid border-gray-200 not-first:border-l not-first:pl-2'
const headerClassName = 'text-2xs font-semibold text-gray-600 text-center'

const preventFocusLoss = (event: React.MouseEvent) => {
  // Clicking a time must keep the caret in the field, like the browser picker does
  event.preventDefault()
}

export const TimePickerColumns = ({
  time,
  hourCycle,
  hourLabel,
  minuteLabel,
  autoFocus = false,
  onChange,
  onClose,
  className,
  style,
  'data-testid': dataTestId,
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { hours, minutes } = time
  const period = hours < HALF_DAY ? AM : PM
  const twelveHour = hourCycle === 12

  useEffect(() => {
    if (autoFocus) {
      rootRef.current
        ?.querySelector<HTMLElement>(SELECTED_OPTION)
        ?.focus({ preventScroll: true })
    }
  }, [autoFocus])

  const focusSiblingColumn = (from: Element, offset: number) => {
    const columns = Array.from(
      rootRef.current?.querySelectorAll('[role="listbox"]') ?? []
    )
    const current = columns.findIndex(column => column.contains(from))
    const sibling = columns[current + offset]

    sibling?.querySelector<HTMLElement>(SELECTED_OPTION)?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault()
        focusSiblingColumn(
          event.target as Element,
          event.key === 'ArrowRight' ? 1 : -1
        )
        break
      case 'Enter':
        event.preventDefault()
        event.stopPropagation()
        onClose({ revert: false })
        break
      case 'Escape':
        event.stopPropagation()
        onClose({ revert: true })
        break
      case 'Tab':
        onClose({ revert: false })
        break
    }
  }

  const handleHourChange = (hour: number) =>
    onChange({
      hours: twelveHour ? (hour % HALF_DAY) + period * HALF_DAY : hour,
      minutes,
    })

  const handlePeriodChange = (nextPeriod: number) =>
    onChange({
      hours: (hours % HALF_DAY) + nextPeriod * HALF_DAY,
      minutes,
    })

  return (
    <div
      ref={rootRef}
      onKeyDown={handleKeyDown}
      onMouseDown={preventFocusLoss}
      className={twMerge(
        'flex w-fit gap-2 p-2 bg-white rounded-sm shadow-5',
        className
      )}
      style={style}
      data-testid={dataTestId}
    >
      <div className={sectionClassName}>
        <span aria-hidden className={headerClassName}>
          {hourLabel}
        </span>
        <TimePickerColumn
          label={hourLabel}
          options={twelveHour ? HOURS_12 : HOURS_24}
          value={twelveHour ? hours % HALF_DAY || HALF_DAY : hours}
          onChange={handleHourChange}
        />
      </div>
      <div className={sectionClassName}>
        <span aria-hidden className={headerClassName}>
          {minuteLabel}
        </span>
        <TimePickerColumn
          label={minuteLabel}
          options={MINUTES}
          value={minutes}
          onChange={minute => onChange({ hours, minutes: minute })}
        />
      </div>
      {twelveHour && (
        <div className={sectionClassName}>
          <span aria-hidden className={twMerge(headerClassName, 'invisible')}>
            {PERIOD_LABEL}
          </span>
          <TimePickerColumn
            label={PERIOD_LABEL}
            options={PERIODS}
            value={period}
            onChange={handlePeriodChange}
          />
        </div>
      )}
    </div>
  )
}

TimePickerColumns.displayName = 'TimePickerColumns'

export default TimePickerColumns
