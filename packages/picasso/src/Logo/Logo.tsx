import React, { forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'
import {
  Logo as LogoIcon,
  LogoEmblem as LogoEmblemIcon
} from '@toptal/picasso-icons'

import styles from './styles'

type VariantType = 'default' | 'white' | 'black' | 'grey' | 'blue'

export interface Props extends StandardProps {
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
}

export const Logo = forwardRef<SVGSVGElement, Props>(function Logo(
  { classes, emblem, variant = 'default', style, className },
  ref
) {
  const rootClass = emblem ? classes.rootEmblem : classes.root
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
