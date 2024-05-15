import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'

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
        'text-lg min-w-full transition-none -mr-2 -mb-2 [&>*]:mr-2 [&>*]:mb-2',
        className
      )}
    >
      {children}
    </div>
  )
})

TagGroup.defaultProps = {
  children: undefined,
}

TagGroup.displayName = 'TagGroup'

export default TagGroup
