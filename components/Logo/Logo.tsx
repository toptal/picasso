import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Icon } from '../'
import IconsLibrary, {
  Logo as LogoIcon,
  LogoEmblem as LogoEmblemIcon
} from '../Icon'
import styles from './styles'
import { Classes } from '../styles/types'

IconsLibrary.add(LogoIcon, LogoEmblemIcon)

type VariantType = 'default' | 'white' | 'black'

interface Props {
  classes: Classes
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
}

export const Logo: React.FunctionComponent<Props> = props => {
  const { classes, emblem, variant, ...rest } = props
  const rootClass = emblem ? classes.logoEmblem : classes.logo
  const colorClass = classes[variant!]

  return (
    <Icon
      className={cx(rootClass, colorClass)}
      name={emblem ? 'logoEmblem' : 'logo'}
      {...rest}
    />
  )
}

Logo.defaultProps = {
  variant: 'default'
}

export default withStyles(styles)(Logo)
