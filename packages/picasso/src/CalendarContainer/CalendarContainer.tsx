import type { ReactNode } from 'react'
import React, { useContext } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import CalendarContext from '../CalendarContext'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCalendarContainer',
})

export type CalendarContainerProps = {
  children?: ReactNode
  hasFooter?: boolean
}

export type RenderRoot = (args: CalendarContainerProps) => JSX.Element

const CalendarContainer = ({ children, hasFooter }: CalendarContainerProps) => {
  const classes = useStyles()
  const { renderRoot } = useContext(CalendarContext)

  return renderRoot ? (
    <>{renderRoot({ hasFooter, children })}</>
  ) : (
    <div
      className={cx(classes.root, {
        [classes.hasFooter]: hasFooter,
      })}
    >
      {children}
    </div>
  )
}

export default CalendarContainer
