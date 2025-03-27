import type { HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { BaseProps, OverridableComponent } from '@toptal/picasso-shared'
import { SkeletonLoader } from '@toptal/picasso-skeleton-loader'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { PageContext } from '../Page'
import type { PageContextProps } from '../Page'
import { getMaxWidthClass } from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {}

export const PageTopBarLoader: OverridableComponent<Props> = forwardRef<
  HTMLDivElement,
  Props
>(function PageTopBarLoader(props, ref) {
  const { className, style, ...rest } = props
  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const innerClassName = twMerge(
    'flex items-center justify-between h-[var(--header-height,3.5rem)] px-4 md:px-8',
    getMaxWidthClass({ fullWidth, width })
  )

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        'fixed top-0 left-0 right-0 w-full bg-gray-100 z-[1200] border border-gray-400',
        className
      )}
      style={style}
    >
      <div className={innerClassName}>
        {/* Left part: Media and Headers */}
        <div className='flex items-center gap-4'>
          <SkeletonLoader.Media
            variant='image'
            width='2rem'
            height='2rem'
            circle
          />
          <div className='flex flex-col items-center gap-2'>
            <SkeletonLoader.Header className='w-32 h-4' />
            <SkeletonLoader.Header className='w-24 h-4' />
          </div>
        </div>

        {/* Right part: Headers */}
        <div className='flex flex-col items-center gap-2'>
          <SkeletonLoader.Header className='w-32 h-4' />
          <SkeletonLoader.Header className='w-24 h-4' />
        </div>
      </div>
    </div>
  )
})

PageTopBarLoader.displayName = 'PageTopBarLoader'

export default PageTopBarLoader
