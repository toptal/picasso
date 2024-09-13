import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { SkeletonLoader } from '@toptal/picasso-skeleton-loader'

export interface Props extends BaseProps, TextLabelProps {
  /**
   * Buttons or other actions to be rendered on the right side of the title
   */
  actions?: ReactNode
  /**
   * Breadcrumbs component to be rendered above the title
   */
  breadcrumbs?: ReactNode
  /** Whether it should have right padding */
  rightPadding?: boolean
  /** Whether it should hide bottom border */
  noBorder?: boolean
  /** Render components next to the title. */
  titleAdornments?: ReactNode[]
  /** Title */
  title?: string
  /** Shows the loading skeleton when title is loading */
  titleLoading?: boolean
  /** Subtitle */
  subtitle?: string
  /** Shows the loading skeleton when subtitle is loading */
  subtitleLoading?: boolean
}

const borderPseudoElement = [
  'after:content-[""]',
  'after:absolute',
  'after:inset-x-0',
  'after:bottom-0',
  'after:z-0',
  'after:bg-gray-200',
  'after:h-[1px]',
]

export const PageHeadBase = forwardRef<HTMLDivElement, Props>(
  (
    {
      breadcrumbs,
      title,
      titleAdornments,
      titleCase,
      subtitle,
      actions,
      noBorder = false,
      rightPadding = false,
      titleLoading = false,
      subtitleLoading = false,
      className,
    },
    ref
  ) => {
    const withBorder = !noBorder

    const getLoadingState = (loading?: boolean) => {
      if (loading) {
        return <SkeletonLoader.Header />
      }

      return true
    }

    return (
      <div
        className={twMerge(
          'relative flex flex-col gap-6',
          ['py-3', rightPadding && 'pr-8'],
          withBorder && borderPseudoElement,
          className
        )}
        ref={ref}
      >
        <div className='flex flex-col gap-4'>
          {breadcrumbs}

          {/* main */}
          {
            <div className='flex justify-between items-start gap-6 flex-wrap'>
              {/* Title and Subtitle container */}
              <div className='flex flex-col gap-1'>
                {/* Title  container */}
                {title && (
                  <div className='flex items-center gap-2'>
                    {titleLoading ? (
                      getLoadingState(titleLoading)
                    ) : (
                      <Typography
                        variant='heading'
                        size='large'
                        titleCase={titleCase}
                        className={className}
                      >
                        {title}
                      </Typography>
                    )}
                    {titleAdornments}
                  </div>
                )}
                {subtitleLoading
                  ? getLoadingState(subtitleLoading)
                  : subtitle && (
                      <div>
                        <Typography size='small'>{subtitle}</Typography>
                      </div>
                    )}
              </div>

              {/* Actions container */}
              {actions && (
                <div className='flex items-center min-h-8'>{actions}</div>
              )}
            </div>
          }
        </div>
      </div>
    )
  }
)

PageHeadBase.displayName = 'PageHeadBase'

export default PageHeadBase
