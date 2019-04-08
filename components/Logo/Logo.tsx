import React, { CSSProperties } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Logo as LogoIcon, LogoEmblem as LogoEmblemIcon } from '../Icon'
import styles from './styles'
import { Classes } from '../styles/types'

type VariantType = 'default' | 'white' | 'black'

interface Props {
  classes: Classes
  className?: string
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
  style?: CSSProperties
}

export const Logo: React.FunctionComponent<Props> = props => {
  const { classes, emblem, variant, style, className } = props
  const rootClass = emblem ? classes.logoEmblem : classes.logo
  const colorClass = classes[variant!]
  const LogoComponent = emblem ? LogoEmblemIcon : LogoIcon

  return (
    <LogoComponent
      className={cx(rootClass, colorClass, className)}
      style={style}
    />
  )
}

Logo.defaultProps = {
  variant: 'default'
}

export default withStyles(styles)(Logo)
