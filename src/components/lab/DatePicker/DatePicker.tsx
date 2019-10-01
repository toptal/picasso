import React, { forwardRef, useState, Fragment as div } from 'react'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { ClickAwayListener } from '@toptal/picasso/utils'
// @ts-ignore
import SimpleReactCalendar from 'simple-react-calendar'
import cx from 'classnames'
import format from 'date-fns/format'
import { Button, Typography, Input, Container } from '@toptal/picasso'
import { ChevronMinor16, BackMinor16 } from '@toptal/picasso/Icon'

import { BaseProps } from '../../Picasso'
import styles from './styles'

type RangeType = { start: Date; end: Date }

const useStyles = makeStyles<Theme, CalendarProps>(styles)

export const DatePicker = ({ onSelect, range }: any) => {
  const [opened, setOpened] = useState(false)

  const showCalendar = () => setOpened(true)
  const hideCalendar = () => setOpened(false)

  return (
    <ClickAwayListener onClickAway={hideCalendar}>
      <Container inline>
        <Input onFocus={showCalendar} />

        <Calendar
          opened={opened}
          onSelect={(dates: any) => {
            onSelect(dates)
          }}
          range={range}
        />
      </Container>
    </ClickAwayListener>
  )
}

export interface CalendarProps extends BaseProps {
  range?: boolean
  onSelect: (value: Date | Date[]) => void
  opened?: boolean
}

const activeMonth = new Date()

export const Calendar = forwardRef<HTMLElement, CalendarProps>(
  function Calendar(
    props,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) {
    const { range = false, opened = false, onSelect } = props
    const [selected, setSelected] = useState<Date | RangeType | undefined>(
      undefined
    )
    const classes = useStyles(props)

    if (!opened) return null

    const handleSelect = (selection: Date | RangeType) => {
      setSelected(selection)

      if (range) {
        onSelect([(selection as RangeType).start, (selection as RangeType).end])
      } else {
        onSelect(selection as Date)
      }
    }

    return (
      <SimpleReactCalendar
        selected={selected}
        onSelect={handleSelect}
        customRender={(props: any) => {
          return <div className={classes.root}>{props.children}</div>
        }}
        renderDay={(props: any) => {
          return (
            <button
              className={cx(classes.day, {
                [classes.selected]: props.isSelected,
                [classes.selectable]: props.isSelectable,
                [classes.today]: props.isToday,
                [classes.grayed]:
                  (props.isMonthPrev || props.isMonthNext) && !props.isSelected,
                [classes.startSelection]: props.isSelectionStart,
                [classes.endSelection]: props.isSelectionEnd
              })}
              onClick={props.handleOnClick}
              onMouseEnter={props.handleOnEnter}
              value={props.date}
              type='button'
            >
              {props.children}
            </button>
          )
        }}
        renderMonthHeader={(props: any) => {
          return (
            <div className={classes.actions}>
              <Button
                variant='flat'
                size='small'
                onClick={() => props.switchMonth(-1)}
              >
                <BackMinor16 />
              </Button>
              <Typography variant='heading' size='medium'>
                {format(props.activeMonth, 'MMMM y')}
              </Typography>
              <Button
                variant='flat'
                size='small'
                onClick={() => props.switchMonth(+1)}
              >
                <ChevronMinor16 />
              </Button>
            </div>
          )
        }}
        renderDaysOfWeek={(props: any) => {
          return <div className={classes.weekDays}>{props.children}</div>
        }}
        renderDayOfWeek={(props: any) => {
          return <div className={classes.weekDay}>{props.children}</div>
        }}
        renderWeek={(props: any) => {
          return <div className={classes.week}>{props.children}</div>
        }}
        activeMonth={activeMonth}
        mode={range ? 'range' : 'single'}
      />
    )
  }
)

Calendar.displayName = 'Calendar'

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
