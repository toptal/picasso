import React, { ReactNode, forwardRef, useContext, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import styles from './styles'
import { HelpboxContextProps } from '../Helpbox/types'
import HelpboxContext from '../Helpbox/HelpboxContext'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Actions part of Helpbox */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpboxActions'
})

export const HelpboxActions = forwardRef<HTMLDivElement, Props>(
  function HelpboxActions(props, ref) {
    const { className, style, children, ...rest } = props

    const classes = useStyles()

    const { closeable }: HelpboxContextProps = useContext<HelpboxContextProps>(
      HelpboxContext
    )

    return (
      <Container
        {...rest}
        ref={ref}
        className={cx(
          classes.root,
          {
            [classes.rootCloseable]: closeable
          },
          className
        )}
        style={style}
        flex
        alignItems='center'
      >
        {children}
      </Container>
    )
  }
)

HelpboxActions.defaultProps = {}

HelpboxActions.displayName = 'HelpboxActions'

export default HelpboxActions
