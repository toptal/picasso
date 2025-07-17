import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

type ContentWidth = 'shrink' | 'full'
export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Content of Helpbox */
  children: ReactNode
  /**
   * Width of the content. If set to `shrink` - the max-width of the content is 640px
   * @default full
   */
  width?: ContentWidth
}

export const HelpboxContent = forwardRef<HTMLElement, Props>(
  function HelpboxContent({ width = 'full', ...props }, ref) {
    const { className, style, children, ...rest } = props

    return (
      <Typography
        {...rest}
        ref={ref}
        className={twMerge(width === 'shrink' && 'max-w-[640px]', className)}
        style={style}
        variant='body'
        as='div'
        size='medium'
        color='black'
      >
        {children}
      </Typography>
    )
  }
)

HelpboxContent.displayName = 'HelpboxContent'

export default HelpboxContent
