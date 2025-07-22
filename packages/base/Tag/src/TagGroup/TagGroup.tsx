import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Tag` components which you want to render inside `TagGroup` */
  children: ReactNode
}

export const TagGroup = forwardRef<HTMLDivElement, Props>(function TagGroup(
  props,
  ref
) {
  const { children, className, ...rest } = props

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        '-mr-[0.5em] -mb-[0.5em] [&>*]:mr-[0.5em] [&>*]:mb-[0.5em]',
        className
      )}
    >
      {children}
    </div>
  )
})

TagGroup.displayName = 'TagGroup'

export default TagGroup
