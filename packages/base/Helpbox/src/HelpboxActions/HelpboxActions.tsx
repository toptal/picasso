import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { HelpboxContextProps } from '../Helpbox/types'
import HelpboxContext from '../Helpbox/HelpboxContext'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Actions part of Helpbox */
  children: ReactNode
}

export const HelpboxActions = forwardRef<HTMLDivElement, Props>(
  function HelpboxActions(props, ref) {
    const { className, style, children, ...rest } = props

    const { closeable }: HelpboxContextProps =
      useContext<HelpboxContextProps>(HelpboxContext)

    return (
      <Container
        {...rest}
        ref={ref}
        className={twMerge(
          'absolute right-6 top-6',
          closeable && 'right-[4rem]',
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

HelpboxActions.displayName = 'HelpboxActions'

export default HelpboxActions
