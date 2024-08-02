import React, { forwardRef, useState } from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'
import type { EnvironmentType, BaseProps } from '@toptal/picasso-shared'

export type EnvironmentTypes = EnvironmentType<'temploy' | 'test'>
type SupportedEnvironments = Exclude<EnvironmentTypes, 'production' | 'test'>

export interface Props extends BaseProps {
  /** Name of the current environment */
  environment: EnvironmentTypes
  /** Name of the product to be rendered alongside environment (i.e. Blackfish, Talent, Portal, Billing) */
  productName: string
}

const ENVIRONMENT_BORDER_COLORS = {
  development: 'border-t-green-600',
  temploy: 'border-t-yellow-500',
  staging: 'border-t-red-500',
}

const ENVIRONMENT_LABEL_BACKGROUND_COLORS = {
  development: 'bg-green-600',
  temploy: 'bg-yellow-500',
  staging: 'bg-red-500',
}

const getLabelBackgroundColor = (environment: SupportedEnvironments) =>
  ENVIRONMENT_LABEL_BACKGROUND_COLORS[environment]

export const EnvironmentBanner = forwardRef<HTMLDivElement, Props>(
  function EnvironmentBanner(props, ref) {
    const { environment, productName, style } = props
    const [isShown, setIsShown] = useState(true)

    if (!isShown || environment === 'production' || environment === 'test') {
      return null
    }

    return (
      <div
        ref={ref}
        className={twJoin(
          `border-0 border-t-[4px] border-solid ${ENVIRONMENT_BORDER_COLORS[environment]}`,
          'fixed',
          'text-center',
          'top-0',
          'w-[100vw]',
          'z-snackbar',
          'text-xxs',
          'pointer-events-none',
          'leading-6'
        )}
        style={style}
      >
        <div
          onClick={() => setIsShown(false)}
          className={twJoin(
            getLabelBackgroundColor(environment),
            'rounded-b-sm',
            'font-semibold',
            'text-white',
            'cursor-pointer',
            'inline-block',
            'px-2 py-1',
            'tracking-[0.01em]',
            'uppercase',
            'select-none',
            'leading-4',
            'pointer-events-auto'
          )}
        >
          {`${productName} ${environment}`}
        </div>
      </div>
    )
  }
)

EnvironmentBanner.displayName = 'EnvironmentBanner'

export default EnvironmentBanner
