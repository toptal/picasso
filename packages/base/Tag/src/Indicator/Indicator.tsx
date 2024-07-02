import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { classByColor } from './styles'

export type ColorType =
  | 'red'
  | 'yellow'
  | 'blue'
  | 'blue-darker'
  | 'green'
  | 'grey-darker'
  | 'light-grey'
  | 'light-blue'

export interface Props extends BaseProps {
  /** Indicator color */
  color: ColorType
}

export const Indicator = forwardRef<HTMLDivElement, Props>(function Indicator(
  props,
  ref
) {
  const { className, color, style, ...restProps } = props

  return (
    <div
      role='img'
      {...restProps}
      className={twMerge(
        'w-2 h-2 rounded-[50%]',
        classByColor[color],
        className
      )}
      style={style}
      ref={ref}
    />
  )
})

Indicator.displayName = 'Indicator'

export default Indicator
