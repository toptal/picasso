import React, { CSSProperties, forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Logo as LogoIcon, LogoEmblem as LogoEmblemIcon } from '../Icon'
import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'default' | 'white' | 'black'

export interface Props extends StandardProps {
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
  style?: CSSProperties
}

export const Logo = forwardRef<SVGSVGElement, Props>(function Logo(
  { classes, emblem, variant, style, className },
  ref
) {
  const rootClass = emblem ? classes.logoEmblem : classes.logo
  const colorClass = classes[variant!]
  const LogoComponent = emblem ? LogoEmblemIcon : LogoIcon

  return (
    <LogoComponent
      ref={ref}
      className={cx(rootClass, colorClass, className)}
      style={style}
    />
  )
})

Logo.defaultProps = {
  variant: 'default'
}

Logo.displayName = 'Logo'

export default withStyles(styles)(Logo)
