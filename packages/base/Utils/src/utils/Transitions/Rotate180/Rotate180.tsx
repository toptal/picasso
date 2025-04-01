import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

export interface Props extends BaseProps {
  /** Flag for transition execution. */
  on: boolean
  /** Element to apply transitions. */
  children: ReactNode
}

export const Rotate180 = (props: Props) => {
  const { children, style, className, on, ...rest } = props

  const childProps = {
    className: cx(
      className,
      'transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
      {
        'rotate-180': on,
      }
    ),
    style,
    ...rest,
  }

  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(child as ReactElement, childProps)
      )}
    </>
  )
}

Rotate180.displayName = 'Rotate180'

export default Rotate180
