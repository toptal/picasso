/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import {
  Logo as LogoIcon,
  LogoEmblem as LogoEmblemIcon,
} from '@toptal/picasso-icon'

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
  const {
    emblem,
    variant = 'default',
    style,
    className,
    'data-testid': testId,
  } = props

  const classes = useStyles()

  const colorClass = classes[variant]
  const LogoComponent = emblem ? LogoEmblemIcon : LogoIcon

  return (
    <LogoComponent
      ref={ref}
      className={cx(classes.root, colorClass, className)}
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
