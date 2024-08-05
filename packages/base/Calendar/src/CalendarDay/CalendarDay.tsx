import type { ReactNode } from 'react'
import React, { useMemo, useRef } from 'react'
import type { DayProps } from 'react-day-picker'
import { useDayRender } from 'react-day-picker'
import { twJoin } from '@toptal/picasso-tailwind-merge'
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
import { getBackgroundAndTextColorClasses } from './utils/get-background-and-text-color-classes'
import { getBorderClasses } from './utils/get-border-classes'
import { getHoverAndFocusEffectsClasses } from './utils/get-hover-and-focus-effects-classes'

export type RenderDay = (args: RenderDayProps) => ReactNode

const getDayFormatted = (date: Date) => format(date, 'd')

const getISODate = (date: Date) => format(date, 'yyyy-MM-dd')

const checkIfBelongsToPreviousMonth = (date: Date, currentMonth: Date) =>
  isBefore(date, startOfMonth(currentMonth))

const checkIfBelongsToNextMonth = (date: Date, currentMonth: Date) =>
  isAfter(date, endOfMonth(currentMonth))

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

  const stateDependentClasses = useMemo(() => {
    const currentComponentState = {
      isSelected,
      isDisabled,
      isWeekend,
      isToday,
      isOutside,
      isRangeStart,
      isRangeMiddle: isRangeMiddle || isTemporaryRangeMiddle,
      isRangeEnd: isRangeEnd || isTemporaryRangeEnd,
    }

    return twJoin(
      getBackgroundAndTextColorClasses(currentComponentState),
      getBorderClasses(currentComponentState),
      getHoverAndFocusEffectsClasses(currentComponentState),
      isDisabled ? 'cursor-default' : 'cursor-pointer'
    )
  }, [
    isSelected,
    isDisabled,
    isWeekend,
    isToday,
    isOutside,
    isRangeStart,
    isRangeMiddle,
    isRangeEnd,
    isTemporaryRangeMiddle,
    isTemporaryRangeEnd,
  ])

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
        'm-0 p-0',
        'text-[0.75rem]',
        'flex items-center justify-center vertical-align-middle relative',
        'user-select-none',
        'outline-none',
        stateDependentClasses
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
