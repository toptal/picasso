import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import { Logo as LogoIcon, LogoEmblem as LogoEmblemIcon } from '../Icon'
import styles from './styles'

type VariantType = 'default' | 'white' | 'black' | 'grey' | 'blue'

export interface Props extends BaseProps {
  /** Whether logo should be shown as TT emblem or full word mark */
  emblem?: boolean
  /** Variant of the `Logo` */
  variant?: VariantType
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLogo' })

export const Logo = forwardRef<SVGSVGElement, Props>(function Logo(props, ref) {
  const { emblem, variant = 'default', style, className } = props

  const classes = useStyles()

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

export default Logo
