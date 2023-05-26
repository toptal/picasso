import type { ReactNode } from 'react'
import React, { useContext, useRef } from 'react'
import type { DayProps } from 'react-day-picker'
import { useDayRender } from 'react-day-picker'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import isToday from 'date-fns/isToday'
import { endOfMonth, format, isAfter, isBefore, startOfMonth } from 'date-fns'

import styles from './styles'
import { CalendarIndicators } from '../CalendarIndicators'
import CalendarContext from '../CalendarContext'

interface RenderDayProps extends DayProps {
  /** Unique key */
  key?: string
  /** Children nodes */
  children?: ReactNode
  /** Returns formatted date */
  getDayFormatted: (date: Date) => string
  /** Specifies if current day belongs to the previous month */
  isMonthPrev: boolean
  /** Specifies if current day belongs to the next month */
  isMonthNext: boolean
  /** Specifies if day can be selected */
  isSelectable: boolean
}

export type RenderDay = (args: RenderDayProps) => ReactNode

/** Represent the props used by the {@link Day} component. */
export interface CalendarDayProps extends DayProps {
  /** Unique key */
  key?: string
}

const getDayFormatted = (date: Date) => format(date, 'd')

const checkIfBelongsToPreviousMonth = (date: Date, currentMonth: Date) =>
  isBefore(date, startOfMonth(currentMonth))

const checkIfBelongsToNextMonth = (date: Date, currentMonth: Date) =>
  isAfter(date, endOfMonth(currentMonth))

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendar' })

/**
 * The content of a day cell
 */
const CalendarDay = (dayProps: CalendarDayProps): JSX.Element => {
  const { key, date, displayMonth } = dayProps
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { onDayMouseEnter, renderDay } = useContext(CalendarContext)

  const { activeModifiers, buttonProps } = useDayRender(
    date,
    displayMonth,
    buttonRef
  )
  const {
    selected: isSelected,
    disabled: isDisabled,
    indicated: isIndicated,
    outside: isOutside,
    weekend: isWeekend,
    temporaryRangeMiddle: isTemporaryRangeMiddle,
    temporaryRangeEnd: isTemporaryRangeEnd,
    range_start: isRangeStart,
    range_middle: isRangeMiddle,
    range_end: isRangeEnd,
  } = activeModifiers

  const classes = useStyles()

  const defaultMarkup = (
    <button
      ref={buttonRef}
      type='button'
      data-testid={`day-button-${
        isSelected ? 'selected' : getDayFormatted(date)
      }`}
      key={key}
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
        isToday={isToday(date)}
      />
    </button>
  )

  const isMonthPrev = checkIfBelongsToPreviousMonth(date, displayMonth)
  const isMonthNext = checkIfBelongsToNextMonth(date, displayMonth)

  return renderDay ? (
    <>
      {renderDay({
        ...dayProps,
        children: defaultMarkup,
        getDayFormatted,
        isSelectable: !isDisabled,
        isMonthPrev,
        isMonthNext,
      })}
    </>
  ) : (
    defaultMarkup
  )
}

export default CalendarDay
