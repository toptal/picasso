import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  children: React.ReactNode
}

export const Note = forwardRef<HTMLDivElement, Props>(function Note(
  { children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={twMerge(
        `rounded-md border border-solid border-gray-200 py-6 pr-6 pl-[28px] relative overflow-hidden bg-white

        before:content-['']
        before:bg-yellow-500
        before:block
        before:h-full
        before:absolute
        before:top-0
        before:left-0
        before:w-[4px]`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
})

Note.displayName = 'Note'

export default Note
