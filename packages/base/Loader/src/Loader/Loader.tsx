import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { useAppConfig } from '@toptal/picasso-provider'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'

const DEFAULT_PROGRESS = 35
const VIEWBOX_SIZE = 44
const THICKNESS = 3.6

enum SIZES {
  small = 16,
  medium = 32,
  large = 64,
}

type VariantType = 'blue' | 'inherit'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Text content for the `Loader` */
  children?: ReactNode
  /** Shows loader as part of other inline elements such as text */
  inline?: boolean
  /** Size of the `Loader` */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Set the value if want to have static loader with the value specified */
  value?: number
  /** Set this value if you want loader to inherit color of the parent, primary by default */
  variant?: VariantType
}

export const Loader = forwardRef<HTMLDivElement, Props>(function Loader(
  props,
  ref
) {
  const {
    children,
    size = 'medium',
    inline = false,
    className,
    value,
    variant = 'blue',
    style,
    ...rest
  } = props

  const { disableTransitions } = useAppConfig()

  const progress = disableTransitions ? DEFAULT_PROGRESS : value
  const animated = !(disableTransitions || Boolean(progress))

  const circumference = 2 * Math.PI * ((VIEWBOX_SIZE - THICKNESS) / 2)

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        'text-lg flex flex-col items-center',
        inline ? 'inline-flex' : '',
        className
      )}
    >
      <div
        className={twJoin(
          variant === 'blue' ? 'text-blue-500' : 'text-inherit',
          animated
            ? 'animate-[spin_1400ms_linear_infinite]'
            : 'transform -rotate-90'
        )}
        style={{ width: SIZES[size], height: SIZES[size], ...style }}
        role='progressbar'
        aria-valuenow={progress ? Math.round(progress) : undefined}
      >
        <svg
          className='block'
          viewBox={`${VIEWBOX_SIZE / 2} ${
            VIEWBOX_SIZE / 2
          } ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        >
          <circle
            className={twJoin(
              animated
                ? 'animate-[stroke-dash_1.4s_ease-in-out_infinite]'
                : 'transition-all',
              'stroke-[currentColor]'
            )}
            cx={VIEWBOX_SIZE}
            cy={VIEWBOX_SIZE}
            r={(VIEWBOX_SIZE - THICKNESS) / 2}
            fill='none'
            strokeDasharray='80px, 200px'
            strokeDashoffset='0px'
            strokeWidth={THICKNESS}
            style={
              progress
                ? {
                    strokeDashoffset: `${(
                      ((100 - progress) / 100) *
                      circumference
                    ).toFixed(3)}px`,
                    strokeDasharray: circumference.toFixed(3),
                  }
                : undefined
            }
          />
        </svg>
      </div>

      {children && <div className='mt-4'>{children}</div>}
    </div>
  )
})

Loader.defaultProps = {
  inline: false,
  size: 'medium',
  variant: 'blue',
}

Loader.displayName = 'Loader'

export default Loader
