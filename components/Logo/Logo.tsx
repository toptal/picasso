import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Icon } from '../'
import IconsLibrary, {
  Logo as LogoIcon,
  LogoEmblem as LogoEmblemIcon
} from '../Icons'
import styles from './styles'
import { Classes } from '../styles/types'

IconsLibrary.add(LogoIcon, LogoEmblemIcon)

enum Variants {
  DEFAULT = 'default',
  WHITE = 'white',
  BLACK = 'black'
}

interface Props {
  classes: Classes
  emblem: boolean
  variant: Variants
}

const Logo: React.FunctionComponent<Props> = props => {
  const { classes, emblem, variant, ...rest } = props
  const rootClass = emblem ? classes.logoEmblem : classes.logo
  const colorClass = classes[variant]

  return (
    <Icon
      className={cx(rootClass, colorClass)}
      name={emblem ? 'logoEmblem' : 'logo'}
      {...rest}
    />
  )
}

Logo.defaultProps = {
  variant: Variants.DEFAULT
}

export default withStyles(styles)(Logo)
