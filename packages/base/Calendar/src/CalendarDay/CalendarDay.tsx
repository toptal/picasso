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

// TODO: in both variants "getBackgroundAndTextColorClass(?ES)"
const getBackgroundAndTextColorClass = (state: DayState, day: string) => {
  const { isSelected, isOutside, isRangeEnd, isTemporaryRangeEnd, withinSelection, isDisabled, isWeekend, isRangeMiddle, isTemporaryRangeMiddle, isRangeStart } = state
  

  console.log('@@@', day, state)

  // TODO: rangers are pretty clear
  if (isRangeEnd || isTemporaryRangeEnd) {
    return 'bg-blue-500 text-white'
  }
  
  if (isRangeMiddle || isTemporaryRangeMiddle) {
    return 'bg-blue-100 text-black'
  }

  if (isRangeStart) {
    return 'bg-blue-500 text-white'
  }

  if (isSelected) {
    return 'bg-blue-500 text-white'
  }

  if (isDisabled) {
    if (isWeekend) {
      return 'bg-gray-100 text-gray-500'
    }

    return 'bg-white text-gray-500'
  }

  if (isWeekend) {
    if (!isSelected && !withinSelection) {
      return 'text-black bg-gray-100'
    }

    return 'text-black bg-gray-100'
  }

  if (isOutside && !isDisabled) {
    return 'bg-white text-gray-600'
  }

  return 'bg-white'
}

const getBorderClass = (state: DayState, day: string) => {
  const { isSelected, isWeekend, isRangeStart, isRangeEnd, isTemporaryRangeEnd, isDisabled, isRangeMiddle, isTemporaryRangeMiddle, startSelection, endSelection, withinSelection } = state
  
  if (isRangeEnd || isTemporaryRangeEnd) {
    return 'border-none rounded-sm'
  }
  
  if (isRangeMiddle || isTemporaryRangeMiddle) {
    return 'border-none rounded-none'
  }

  if (isRangeStart) {
    return 'border-none rounded-sm'
  }

  if (isSelected) {
    return 'border-none rounded-sm'
  }

  if (isWeekend) {
    return 'border-[4px] border-solid border-white rounded-md'
  }


  return 'border-none rounded-none'
}

const getHoverAndFocusEffectsClass =(state: DayState, day: string) => {
  const { isSelected, isWeekend, isDisabled, startSelection, endSelection, withinSelection } = state

  
  if (isDisabled) {
    if (isWeekend) {
      return '[&]:hover:bg-gray-100 [&]:hover:border-sm [&]:hover:border-white [&]:hover:rounded-md'
    }

    return '[&]:hover:bg-transparent'
  }

  const defaultHoverStyle = '[&]:hover:text-black [&]:focus:text-black [&]:hover:bg-blue-500 [&]:hover:opacity-25 [&]:focus:bg-blue-500 [&]:focus:opacity-25'
  if (isWeekend && !isSelected && !withinSelection) {
    return '[&]:not(:hover):border-sm [&]:not(:hover):border-white [&]:not(:hover):rounded-md ' + defaultHoverStyle
  }

  if (!isSelected && !isDisabled && !startSelection && !endSelection) {
    return defaultHoverStyle
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
  }), [    isSelected,
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
    isTemporaryRangeEnd])

  const defaultComponent = (
    <button
      ref={buttonRef}
      type='button'
      data-testid={`day-button-${
        isSelected ? 'selected' : getDayFormatted(date)
      }`}
      data-calendar-day={isoDate}
      tabIndex={isDisabled ? -1 : undefined}

      className={twJoin(
        'h-[2.5rem] w-[2.5rem] min-w-[2.5rem]',
        'vertical-align-middle text-xxs user-select-none flex items-center justify-center',
        'relative',
        'm-0 p-0',
        'outline-none cursor-pointer',

/*

Options:
- split by state combinations and properties



*/


        getBackgroundAndTextColorClass(defaultComponentState, getDayFormatted(date)),
        getBorderClass(defaultComponentState, getDayFormatted(date)),
        //getHoverAndFocusEffectsClass(defaultComponentState, getDayFormatted(date)),

        isDisabled && 'cursor-default',
        isRangeStart && isToday && 'after:bg-white',
        (isRangeEnd || isTemporaryRangeEnd) && isToday && 'after:bg-white',
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
