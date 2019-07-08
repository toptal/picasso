import React, {
  ReactNode,
  FunctionComponent,
  useContext,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Container from '../Container'
import styles from './styles'
import { HelpboxContext } from '../Helpbox'
import { HelpboxContextProps } from '../Helpbox/types'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Actions part of Helpbox */
  children: ReactNode
}

export const HelpboxActions: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  ...rest
}) => {
  const { closeable } = HelpboxContext
    ? useContext<HelpboxContextProps>(HelpboxContext)
    : ({} as HelpboxContextProps)

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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
