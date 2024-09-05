import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, TextLabelProps {
  /**
   * Buttons or other actions to be rendered on the right side of the title
   */
  actions?: ReactNode
  /**
   * Breadcrumbs component to be rendered above the title
   */
  breadcrumbs?: ReactNode
  /**
   * Tabs or Stepper component to be rendered below the title
   */
  controls?: ReactNode
  /** Whether it should have right padding */
  rightPadding?: boolean
  /** Whether it should hide bottom border */
  noBorder?: boolean
  /** Render components nex to the title. */
  titleAdornments?: ReactNode[]
  /** Title */
  title?: string
  /** Subtitle */
  subtitle?: string
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

export const PageHead = forwardRef<HTMLDivElement, Props>(
  (
    {
      breadcrumbs,
      controls,
      title,
      titleAdornments,
      titleCase,
      subtitle,
      actions,
      noBorder = false,
      rightPadding = false,
      className,
    },
    ref
  ) => {
    const withBorder = !noBorder

    const isTabsPassed =
      controls && (controls as any).type?.displayName === 'Tabs'

    return (
      <div
        className={twMerge(
          'relative flex flex-col gap-6',
          ['pt-3', !isTabsPassed && 'pb-3', rightPadding && 'pr-8'],
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
                    <Typography
                      variant='heading'
                      size='large'
                      titleCase={titleCase}
                      className={className}
                    >
                      {title}
                    </Typography>
                    {titleAdornments}
                  </div>
                )}
                {subtitle && (
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
        {controls && <div>{controls}</div>}
      </div>
    )
  }
)

PageHead.displayName = 'PageHead'

export default PageHead
