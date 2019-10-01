import React, { forwardRef, useState, Fragment } from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

// @ts-ignore
import Calendar from 'simple-react-calendar'
import cx from 'classnames'
import { Button, Typography, Input } from '@toptal/picasso'
import { ChevronMinor16, BackMinor16 } from '@toptal/picasso/Icon'
import format from 'date-fns/format'

import { StandardProps } from '../Picasso'
import styles from './styles'

type RangeType = {start: Date, end: Date}

const useStyles = makeStyles<Theme, Props>(styles)

export const DatePicker = (props: any) => {
  const [opened, setOpened] = useState(false)

  const openDatepicker = () => setOpened(true)

  return (
    <Fragment>
      <Input onClick={openDatepicker} />

      <PicassoCalendar
        classes={{}}
        opened={opened}
        onSelect={(dates: any) => {
          console.log(dates)
        }}
        range
      />
    </Fragment>
  )
}

export interface Props extends StandardProps {
  range?: boolean
  onSelect: (value: Date | Date[]) => void
  opened?: boolean
}

const activeMonth = new Date()

export const PicassoCalendar = forwardRef<HTMLElement, Props>(function DatePicker(
  props,
  ref
) {
  const { range = false, opened = false, onSelect } = props
  const [selected, setSelected] = useState<Date|RangeType|undefined>(undefined)
  const classes = useStyles(props)

  if (!opened) return null

  return (
    <Calendar
      selected={selected}
      onSelect={(selection: Date | RangeType) => {
        setSelected(selection)

        if (range) {
          onSelect([(selection as RangeType).start, (selection as RangeType).end])
        } else {
          onSelect(selection as Date)
        }
      }}
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
              [classes.grayed]: (props.isMonthPrev || props.isMonthNext) && !props.isSelected,
              [classes.startSelection]: props.isSelectionStart,
              [classes.endSelection]: props.isSelectionEnd
            })}
            onClick={props.handleOnClick}
            onMouseEnter={props.handleOnEnter}
            value={props.date}
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
            <Typography variant='heading' size='medium'>{format(props.activeMonth, 'MMMM y')}</Typography>
            <Button
              variant='flat'
              size='small'
              onClick={() => props.switchMonth(+1)}
            ><ChevronMinor16 />
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
})

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
