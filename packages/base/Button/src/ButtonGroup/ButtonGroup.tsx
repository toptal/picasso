import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'

import { ButtonGroupItem } from '../ButtonGroupItem'
import { createRootClassNames } from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup(props, ref) {
    const { children, className, style, ...rest } = props

    const finalClassName = twMerge(createRootClassNames(), className)

    return (
      <div
        {...rest}
        ref={ref}
        data-component-type='button'
        className={finalClassName}
        style={style}
      >
        {children}
      </div>
    )
  }
)

ButtonGroup.defaultProps = {}

ButtonGroup.displayName = 'ButtonGroup'

export default Object.assign(ButtonGroup, { Item: ButtonGroupItem })
