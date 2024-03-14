import cx from 'classnames'
import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  elevation?: number
  children: ReactNode
}

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  props,
  ref
) {
  const { className, elevation, style, children, ...rest } = props

  /*
  TODO: [FX-5003] Deprecate legacy shadow classes

  Use complete class names in comment, so Tailwind includes all of them in the build
  .shadow-0 .shadow-1 .shadow-2 .shadow-3 .shadow-4 .shadow-5 .shadow-6 .shadow-7 
  .shadow-8  .shadow-9 .shadow-10 .shadow-11 .shadow-12 .shadow-13 .shadow-14 .shadow-15 
  .shadow-16 .shadow-17 .shadow-18 .shadow-19 .shadow-20 .shadow-21 .shadow-22 .shadow-23 .shadow-24
  */
  return (
    <div
      ref={ref}
      className={cx(
        'bg-white',
        `shadow-${elevation}`,
        //'transition-shadow duration-300 delay-0',
        className
      )}
      style={{
        color: 'unset',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
})

Paper.defaultProps = {
  elevation: 1,
}

Paper.displayName = 'Paper'

export default Paper
