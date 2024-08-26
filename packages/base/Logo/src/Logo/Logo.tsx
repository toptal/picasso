import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import {
  Logo as LogoIcon,
  LogoEmblem as LogoEmblemIcon,
} from '@toptal/picasso-icons'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { colorClass } from './styles'

type VariantType = 'default' | 'white' | 'black' | 'grey' | 'blue'

export interface Props extends BaseProps {
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
}

export const Logo = forwardRef<SVGSVGElement, Props>(function Logo(props, ref) {
  const {
    emblem,
    variant = 'default',
    style,
    className,
    'data-testid': testId,
  } = props

  const LogoComponent = emblem ? LogoEmblemIcon : LogoIcon

  return (
    <LogoComponent
      ref={ref}
      className={twMerge(
        'text-[1.875rem] align-baseline',
        colorClass[variant],
        className
      )}
      style={style}
      data-testid={testId}
    />
  )
})

Logo.defaultProps = {
  variant: 'default',
}

Logo.displayName = 'Logo'

export default Logo
