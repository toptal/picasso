import type { ReactNode } from 'react'
import React from 'react'
import type { MonthCaptionProps } from 'react-day-picker'
import { useDayPicker } from 'react-day-picker'
import { ButtonCircular } from '@toptal/picasso-button'
import { Typography } from '@toptal/picasso-typography'
import { ChevronMinor24, BackMinor24 } from '@toptal/picasso-icons'
import { Container } from '@toptal/picasso-container'

import { useCalendar } from '../CalendarContext'

interface RenderMonthHeaderProps {
  /** Unique key */
  key?: string
  /** Children nodes */
  children?: ReactNode
  /** The month where the caption is displayed. */
  displayMonth: Date
}

export type RenderMonthHeader = (
  args: RenderMonthHeaderProps
) => React.ReactElement | null

/**
 * The month caption with the month navigation. Calendar hides
 * react-day-picker's own navigation so that `renderMonthHeader` wraps the
 * buttons, and `renderMonthHeader={() => null}` hides them
 */
const CalendarMonthHeader = ({
  calendarMonth,
  displayIndex,
}: MonthCaptionProps): React.ReactElement => {
  const {
    formatters: { formatCaption },
    months,
    previousMonth,
    nextMonth,
    goToMonth,
  } = useDayPicker()
  const { renderMonthHeader } = useCalendar()

  const displayMonth = calendarMonth.date
  const hidePrevious = displayIndex !== 0
  const hideNext = displayIndex !== months.length - 1

  const handlePreviousClick = () => {
    if (previousMonth) {
      goToMonth(previousMonth)
    }
  }

  const handleNextClick = () => {
    if (nextMonth) {
      goToMonth(nextMonth)
    }
  }

  const defaultComponent = (
    <Container flex justifyContent='space-between' bottom='medium'>
      {hidePrevious ? (
        <div />
      ) : (
        <ButtonCircular
          title='Previous month'
          aria-label='Previous month'
          variant='flat'
          icon={<BackMinor24 />}
          onClick={handlePreviousClick}
        />
      )}
      <Typography
        variant='heading'
        size='medium'
        aria-live='polite'
        aria-atomic='true'
      >
        {formatCaption(displayMonth)}
      </Typography>
      {hideNext ? (
        <div />
      ) : (
        <ButtonCircular
          title='Next month'
          aria-label='Next month'
          variant='flat'
          icon={<ChevronMinor24 />}
          onClick={handleNextClick}
        />
      )}
    </Container>
  )

  return renderMonthHeader ? (
    <>
      {renderMonthHeader({
        displayMonth,
        children: defaultComponent,
      })}
    </>
  ) : (
    defaultComponent
  )
}

export default CalendarMonthHeader
