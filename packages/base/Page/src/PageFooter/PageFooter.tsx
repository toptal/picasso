import type { ReactNode, HTMLAttributes } from 'react'
import React, { useContext, forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { PageContext } from '../Page'
import type { PageContextProps } from '../Page/types'
import { getMaxWidthClass } from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Content for copyright. You can override default if needed. */
  copyrightContent?: ReactNode
  /** Content for the right side of the `Footer`  */
  rightContent?: ReactNode
}

export const PageFooter = forwardRef<HTMLElement, Props>(function PageFooter(
  props,
  ref
) {
  const { className, style, rightContent, copyrightContent, ...rest } = props
  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = twJoin(
    getMaxWidthClass({ width, fullWidth }),
    'box-border',
    'flex justify-between xs:max-lg:flex-col',
    'text-white text-md leading-[1em]',
    'mx-auto pt-2 pb-6 px-[1em] md:px-[2em]'
  )

  return (
    <footer
      {...rest}
      ref={ref}
      className={twMerge('bg-[#262d3d] w-full', className)}
      style={style}
    >
      <div className={contentClassnames}>
        <div className='flex items-center justify-center mt-4'>
          {copyrightContent}
        </div>

        <div className='flex items-center justify-center mt-4 xs:max-lg:-order-1 xs:max-md:flex-col'>
          {rightContent}
        </div>
      </div>
    </footer>
  )
})

const CopyrightContent = () => (
  <>{`© Copyright 2010 – ${new Date().getFullYear()} Toptal, LLC`}</>
)

PageFooter.defaultProps = {
  rightContent: null,
  copyrightContent: <CopyrightContent />,
}

PageFooter.displayName = 'PageFooter'

export default PageFooter
