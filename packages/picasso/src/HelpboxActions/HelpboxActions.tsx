import React, { ReactNode, forwardRef, useContext, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import Container from '../Container'
import styles from './styles'
import { HelpboxContextProps } from '../Helpbox/types'
import HelpboxContext from '../Helpbox/HelpboxContext'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Actions part of Helpbox */
  children: ReactNode
}

export const HelpboxActions = forwardRef<HTMLDivElement, Props>(
  function HelpboxActions(
    { classes, className, style, children, ...rest },
    ref
  ) {
    const { closeable }: HelpboxContextProps = useContext<HelpboxContextProps>(
      HelpboxContext
    )

    return (
      <Container
        // eslint-disable-next-line react/jsx-props-no-spreading
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

export default withStyles(styles)(HelpboxActions)
