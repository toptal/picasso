import React, { ReactElement, ReactNode } from 'react'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

export interface Props extends BaseProps {
  /** Flag for transition execution. */
  on: boolean
  /** Element to apply transitions. */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Rotate180'
})

export const Rotate180 = (props: Props) => {
  const { children, style, className, on, ...rest } = props
  const classes = useStyles(props)

  const childProps = {
    className: cx(className, classes.transition, {
      [classes.rotate180]: on
    }),
    style,
    ...rest
  }

  return (
    <React.Fragment>
      {React.Children.map(children, child =>
        React.cloneElement(child as ReactElement, childProps)
      )}
    </React.Fragment>
  )
}

Rotate180.displayName = 'Rotate180'

export default Rotate180
