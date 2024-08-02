import type { ReactNode } from 'react'
import React, { useMemo, useRef } from 'react'
import type { DayProps } from 'react-day-picker'
import { useDayRender } from 'react-day-picker'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'
import {
  isToday as isTodayDateFns,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  startOfMonth,
} from 'date-fns'

import { CalendarIndicators } from '../CalendarIndicators'
import { useCalendar } from '../CalendarContext'
import type { DayProps as RenderDayProps } from '../Calendar'

export type RenderDay = (args: RenderDayProps) => ReactNode

const getDayFormatted = (date: Date) => format(date, 'd')

const getISODate = (date: Date) => format(date, 'yyyy-MM-dd')

const checkIfBelongsToPreviousMonth = (date: Date, currentMonth: Date) =>
  isBefore(date, startOfMonth(currentMonth))

const checkIfBelongsToNextMonth = (date: Date, currentMonth: Date) =>
  isAfter(date, endOfMonth(currentMonth))

type DayState = {
  isSelected: boolean
  isDisabled: boolean
  isWeekend: boolean
  isToday: boolean
  isOutside: boolean
  startSelection: boolean
  withinSelection: boolean
  endSelection: boolean
  isRangeStart: boolean
  isRangeMiddle: boolean
  isRangeEnd: boolean
  isTemporaryRangeMiddle: boolean
  isTemporaryRangeEnd: boolean
}

const getBackgroundColorClass = (state: DayState) => {
  let classes = []




  return 'bg-white'
}

const getHoverAndFocusEffectsClass =(state: DayState) => {
  const { isSelected, isWeekend, isDisabled, startSelection, endSelection, withinSelection } = state

  if (!isSelected && !isDisabled && !startSelection && !endSelection) {
    return '[&]:hover:bg-blue-500 [&]:hover:opacity-25 [&]:focus:bg-blue-500 [&]:focus:opacity-25'
  }

  if (isWeekend && !isSelected && !withinSelection) {
    return '[&]:not(:hover):border-sm [&]:not(:hover):border-white [&]:not(:hover):rounded-md'
  }

  return ''
}

/**
 * The content of a day cell
 */
const CalendarDay = (dayProps: DayProps): JSX.Element => {
  const { date, displayMonth } = dayProps
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { onDayMouseEnter, renderDay } = useCalendar()

  const { activeModifiers, buttonProps } = useDayRender(
    date,
    displayMonth,
    buttonRef
  )

  const {
    selected: isSelected = false,
    disabled: isDisabled = false,
    indicated: isIndicated = false,
    outside: isOutside = false,
    weekend: isWeekend = false,
    temporaryRangeMiddle: isTemporaryRangeMiddle = false,
    temporaryRangeEnd: isTemporaryRangeEnd = false,
    range_start: isRangeStart = false,
    range_middle: isRangeMiddle = false,
    range_end: isRangeEnd = false,
  } = activeModifiers

  const isToday = isTodayDateFns(date)
  const isoDate = getISODate(date)

  const startSelection = isRangeStart
  const withinSelection = isRangeMiddle || isTemporaryRangeMiddle
  const endSelection = isRangeEnd || isTemporaryRangeEnd

  const defaultComponentState = useMemo(() => ({
    isSelected,
    isDisabled,
    isWeekend,
    isToday,
    isOutside,
    startSelection,
    withinSelection,
    endSelection,
    isRangeStart,
    isRangeMiddle,
    isRangeEnd,
    isTemporaryRangeMiddle,
    isTemporaryRangeEnd
  }), [])

  const defaultComponent = (
    <button
      ref={buttonRef}
      type='button'
      data-testid={`day-button-${
        isSelected ? 'selected' : getDayFormatted(date)
      }`}
      data-calendar-day={isoDate}
      tabIndex={isDisabled ? -1 : undefined}

      className={twMerge(
        'h-[2.5rem] w-[2.5rem] min-w-[2.5rem]',
        'vertical-align-middle text-xxs user-select-none flex items-center justify-center',
        'relative',
        'm-0 p-0',
        'border-none outline-none rounded-sm cursor-pointer',

        getBackgroundColorClass(defaultComponentState),

        getHoverAndFocusEffectsClass(defaultComponentState),










        isSelected && 'bg-blue-500 text-white',
        (isWeekend ?
          'bg-gray-100 ' + ((!isSelected &&
            !withinSelection) ?
            '[&]:not(:hover):border-sm [&]:not(:hover):border-white [&]:not(:hover):rounded-md':'') : ''),
        isOutside && !isDisabled && 'text-gray-600',
        isDisabled &&
          ('text-gray-500 cursor-default [&]:hover:bg-transparent ' +
            (isWeekend
              ? '[&]:hover:bg-gray-100 [&]:hover:border-sm [&]:hover:border-white [&]:hover:rounded-md'
              : '')),
        isRangeStart && ('bg-blue-500 text-white ' + (isToday ? 'after:bg-white' : '')),
        (isRangeMiddle || isTemporaryRangeMiddle) && 'bg-blue-100 rounded-none text-black',
        (isRangeEnd || isTemporaryRangeEnd) && ('bg-blue-500 text-white ' + (isToday ? 'after:bg-white' : '')),
      )}
      onClick={isDisabled ? undefined : event => buttonProps?.onClick?.(event)}
      onMouseEnter={event => {
        onDayMouseEnter?.(date)

        buttonProps?.onMouseEnter?.(event)
      }}
      value={date.toString()}
    >
      {getDayFormatted(date)}
      <CalendarIndicators
        isIndicated={isIndicated}
        isSelected={Boolean(isSelected)}
        isToday={isToday}
      />
    </button>
  )

  const isMonthPrev = checkIfBelongsToPreviousMonth(date, displayMonth)
  const isMonthNext = checkIfBelongsToNextMonth(date, displayMonth)

  return renderDay ? (
    <>
      {renderDay({
        isDisabled,
        isSelected,
        isSelectable: !isDisabled,
        isToday,
        isMonthPrev,
        isMonthNext,
        isSelectionStart: isRangeStart,
        isSelectionEnd: isRangeEnd,
        handleOnClick: buttonProps?.onClick as () => void,
        handleOnEnter: buttonProps?.onMouseEnter as () => void,
        date,
        key: isoDate,
        ISODate: isoDate,
        getDayFormatted,
        children: defaultComponent,
      })}
    </>
  ) : (
    defaultComponent
  )
}

export default CalendarDay
