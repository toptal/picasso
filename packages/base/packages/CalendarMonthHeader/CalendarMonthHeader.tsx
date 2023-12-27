/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
import { useDayPicker, useNavigation } from 'react-day-picker'
import isSameMonth from 'date-fns/isSameMonth'
import ButtonCircular from '@toptal/picasso-button-circular'
import Typography from '@toptal/picasso-typography'
import { ChevronMinor24, BackMinor24 } from '@toptal/picasso-icon'
import Container from '@toptal/picasso-container'
import { useCalendar } from '@toptal/picasso-calendar-context'

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
) => JSX.Element | null

const CalendarMonthHeader = (props: RenderMonthHeaderProps) => {
  const {
    formatters: { formatCaption },
    locale,
    classNames,
    disableNavigation,
    styles,
    numberOfMonths,
    onMonthChange,
    dir,
  } = useDayPicker()
  const { previousMonth, nextMonth, goToMonth, displayMonths } = useNavigation()
  const { renderMonthHeader } = useCalendar()

  if (disableNavigation) {
    return (
      <div className={classNames.caption} style={styles.caption}>
        <Typography
          variant='heading'
          size='medium'
          aria-live='polite'
          aria-atomic='true'
        >
          {formatCaption(props.displayMonth, { locale })}
        </Typography>
      </div>
    )
  }

  const displayIndex = displayMonths.findIndex(month =>
    isSameMonth(props.displayMonth, month)
  )

  let isFirst = displayIndex === 0
  let isLast = displayIndex === displayMonths.length - 1

  if (dir === 'rtl') {
    ;[isLast, isFirst] = [isFirst, isLast]
  }

  const hideNext = numberOfMonths > 1 && !isLast
  const hidePrevious = numberOfMonths > 1 && !isFirst

  const handlePreviousClick = () => {
    if (!previousMonth) {
      return
    }
    goToMonth(previousMonth)
    onMonthChange?.(previousMonth)
  }

  const handleNextClick = () => {
    if (!nextMonth) {
      return
    }
    goToMonth(nextMonth)
    onMonthChange?.(nextMonth)
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
        {formatCaption(props.displayMonth, { locale })}
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
        ...props,
        children: defaultComponent,
      })}
    </>
  ) : (
    defaultComponent
  )
}

export default CalendarMonthHeader
