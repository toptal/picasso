/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React, { useRef } from 'react'
import type { DayProps } from 'react-day-picker'
import { useDayRender } from 'react-day-picker'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import {
  isToday as isTodayDateFns,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  startOfMonth,
} from 'date-fns'
import { CalendarIndicators } from '@toptal/picasso-calendar-indicators'
import { useCalendar } from '@toptal/picasso-calendar-context'
import type { DayProps as RenderDayProps } from '@toptal/picasso-calendar'

import styles from './styles'

export type RenderDay = (args: RenderDayProps) => ReactNode

const getDayFormatted = (date: Date) => format(date, 'd')

const getISODate = (date: Date) => format(date, 'yyyy-MM-dd')

const checkIfBelongsToPreviousMonth = (date: Date, currentMonth: Date) =>
  isBefore(date, startOfMonth(currentMonth))

const checkIfBelongsToNextMonth = (date: Date, currentMonth: Date) =>
  isAfter(date, endOfMonth(currentMonth))

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendar' })

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

  const classes = useStyles()

  const defaultComponent = (
    <button
      ref={buttonRef}
      type='button'
      data-testid={`day-button-${
        isSelected ? 'selected' : getDayFormatted(date)
      }`}
      data-calendar-day={isoDate}
      tabIndex={isDisabled ? -1 : undefined}
      className={cx(classes.day, {
        [classes.selected]: isSelected,
        [classes.weekend]: isWeekend,
        [classes.grayed]: isOutside && !isDisabled,
        [classes.disabled]: isDisabled,
        [classes.startSelection]: isRangeStart,
        [classes.withinSelection]: isRangeMiddle || isTemporaryRangeMiddle,
        [classes.endSelection]: isRangeEnd || isTemporaryRangeEnd,
      })}
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
