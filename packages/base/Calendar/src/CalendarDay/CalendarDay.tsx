import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import type { DayButtonProps } from 'react-day-picker'
import { twJoin } from '@toptal/picasso-tailwind-merge'
import { FOCUS_RING } from '@toptal/picasso-shared'
import { endOfMonth, format, isAfter, isBefore, startOfMonth } from 'date-fns'

import { CalendarIndicators } from '../CalendarIndicators'
import { useCalendar } from '../CalendarContext'
import type { DayProps as RenderDayProps } from '../Calendar'
import { getTextColorClass } from './utils/get-text-color-class'
import { getBackgroundColorClass } from './utils/get-background-color-class'
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
 * The content of a day cell. The button props react-day-picker passes (roving
 * tabIndex, aria-label, keyboard and focus handlers) are left out, so Tab moves
 * day by day and the visible day number stays the accessible name
 */
const CalendarDay = ({
  day,
  modifiers,
}: DayButtonProps): React.ReactElement => {
  const { date, displayMonth } = day
  const { onDayMouseEnter, onDaySelect, renderDay } = useCalendar()

  const {
    selected: isSelected = false,
    disabled: isDisabled = false,
    indicated: isIndicated = false,
    outside: isOutside = false,
    weekend: isWeekend = false,
    today: isToday = false,
    temporaryRangeMiddle: isTemporaryRangeMiddle = false,
    temporaryRangeEnd: isTemporaryRangeEnd = false,
    rangeStart: isRangeStart = false,
    range_middle: isRangeMiddle = false,
    rangeEnd: isRangeEnd = false,
  } = modifiers

  const isoDate = getISODate(date)

  const handleClick = () => {
    if (!isDisabled) {
      onDaySelect?.(date)
    }
  }

  const handleMouseEnter = () => onDayMouseEnter?.(date)

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
      getTextColorClass(currentComponentState),
      getBackgroundColorClass(currentComponentState),
      getBorderClasses(currentComponentState),
      getHoverAndFocusEffectsClasses(currentComponentState),
      isDisabled ? 'cursor-default' : 'cursor-pointer',
      // Raised, or the neighbouring days paint over the ring
      !isDisabled && ['focus-visible:z-1', FOCUS_RING.blue.focusVisible]
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
      type='button'
      // Stable and unique: selection state lives on `data-selected`, and an
      // outside-month cell is prefixed so it cannot collide with the in-month
      // cell showing the same number.
      data-testid={`day-button-${isOutside ? 'outside-' : ''}${getDayFormatted(
        date
      )}`}
      data-calendar-day={isoDate}
      data-selected={isSelected || undefined}
      tabIndex={isDisabled ? -1 : undefined}
      className={twJoin(
        'h-10 w-10 min-w-10',
        'm-0 p-0',
        'text-[0.75rem]',
        'flex items-center justify-center vertical-align-middle relative',
        'user-select-none',
        'outline-hidden',
        stateDependentClasses
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
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
        handleOnClick: handleClick,
        handleOnEnter: handleMouseEnter,
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
