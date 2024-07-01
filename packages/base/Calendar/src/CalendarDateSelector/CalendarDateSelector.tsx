import React from 'react'
import type { DropdownProps } from 'react-day-picker'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'
import { ArrowDropDown16 } from '@toptal/picasso-icons'
import { makeStyles, type Theme } from '@material-ui/core/styles'

import styles from '../Calendar/styles'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCalendar' })

const CalendarDateSelector = ({
  children,
  caption,
  onChange,
  value,
  'aria-label': ariaLabel,
}: DropdownProps) => {
  const classes = useStyles()

  return (
    <label
      aria-label={ariaLabel}
      htmlFor={`month${caption}`}
      className={classes.dropdown_label}
    >
      <Typography
        variant='heading'
        size='medium'
        color='black'
        weight='semibold'
      >
        {caption}
      </Typography>
      <Container
        className={classes.icon_wrapper}
        flex
        justifyContent='center'
        alignItems='center'
      >
        <ArrowDropDown16 className={classes.pointer_events} color='darkGrey' />
      </Container>
      <select
        name={`month${caption}`}
        className={classes.select}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </label>
  )
}

export default CalendarDateSelector
