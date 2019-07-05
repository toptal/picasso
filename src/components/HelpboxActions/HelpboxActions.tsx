import React, { ReactNode, FunctionComponent, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Container from '../Container'
import styles from './styles'
import { HelpboxContext } from '../Helpbox'
import { HelpboxContextProps } from '../Helpbox/types'

export interface Props extends StandardProps {
  /** Actions part of Helpbox */
  children: ReactNode
}

export const HelpboxActions: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children
}) => {
  const { closeable } = useContext<HelpboxContextProps>(HelpboxContext)

  return (
    <Container
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

HelpboxActions.defaultProps = {}

HelpboxActions.displayName = 'HelpboxActions'

export default withStyles(styles)(HelpboxActions)
