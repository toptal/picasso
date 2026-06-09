import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { createRotate180ClassNames } from './styles'

export interface Props extends BaseProps {
  /** Flag for transition execution. */
  on: boolean
  /** Element to apply transitions. */
  children: ReactNode
}

export const Rotate180 = (props: Props) => {
  const { children, style, className, on, ...rest } = props

  const childProps = {
    className: twMerge(cx(createRotate180ClassNames(on)), className),
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
