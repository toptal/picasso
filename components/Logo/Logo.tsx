import React, { CSSProperties, FunctionComponent } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Logo as LogoIcon, LogoEmblem as LogoEmblemIcon } from '../Icon'
import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'default' | 'white' | 'black'

interface Props extends StandardProps {
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
  style?: CSSProperties
}

export const Logo: FunctionComponent<Props> = ({
  classes,
  emblem,
  variant,
  style,
  className
}) => {
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
