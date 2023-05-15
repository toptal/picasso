import type { ReactNode } from 'react'
import React, { useContext } from 'react'
import type { CaptionProps } from 'react-day-picker'
import { useDayPicker, useNavigation } from 'react-day-picker'
import isSameMonth from 'date-fns/isSameMonth'

import ButtonCircular from '../ButtonCircular'
import Typography from '../Typography'
import { ChevronMinor24, BackMinor24 } from '../Icon'
import Container from '../Container'
import CalendarContext from '../CalendarContext'

interface RenderMonthHeaderProps extends CaptionProps {
  /** Unique key */
  key?: string
  /** Children nodes */
  children?: ReactNode
}

export type RenderMonthHeader = (args: RenderMonthHeaderProps) => ReactNode

const CalendarMonthHeader = (props: CaptionProps) => {
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
  const { renderMonthHeader } = useContext(CalendarContext)

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

  const hideNext = numberOfMonths > 1 && (isFirst || !isLast)
  const hidePrevious = numberOfMonths > 1 && (isLast || !isFirst)

  const handlePreviousClick: React.MouseEventHandler = () => {
    if (!previousMonth) {
      return
    }
    goToMonth(previousMonth)
    onMonthChange?.(previousMonth)
  }

  const handleNextClick: React.MouseEventHandler = () => {
    if (!nextMonth) {
      return
    }
    goToMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  const defaultMarkup = (
    <Container flex justifyContent='space-between' bottom='medium'>
      {!hidePrevious && (
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
      {!hideNext && (
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
        children: defaultMarkup,
      })}
    </>
  ) : (
    defaultMarkup
  )
}

export default CalendarMonthHeader
