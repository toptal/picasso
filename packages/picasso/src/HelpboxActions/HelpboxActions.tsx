/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import Container from '@toptal/picasso-container'
import type { HelpboxContextProps } from '@toptal/picasso-helpbox/types'
import HelpboxContext from '@toptal/picasso-helpbox/-helpbox-context'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Actions part of Helpbox */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpboxActions',
})

export const HelpboxActions = forwardRef<HTMLDivElement, Props>(
  function HelpboxActions(props, ref) {
    const { className, style, children, ...rest } = props

    const classes = useStyles()

    const { closeable }: HelpboxContextProps =
      useContext<HelpboxContextProps>(HelpboxContext)

    return (
      <Container
        {...rest}
        ref={ref}
        className={cx(
          classes.root,
          {
            [classes.rootCloseable]: closeable,
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
