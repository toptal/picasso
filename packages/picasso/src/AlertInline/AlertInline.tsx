import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import cx from 'classnames'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import { VariantType as ContainerVariants } from '@toptal/picasso/Container'
import { makeStyles, Theme } from '@material-ui/core'

import Container from '../Container'
import Typography from '../Typography'
import { Exclamation16, Done16, Info16 } from '../Icon'
import styles from './styles'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
  iconPadding?: SizeType<'xsmall' | 'small'> // undocumented prop, only for internal usage
}

export const renderAlertIcon = (variant?: VariantType) => {
  switch (variant) {
    case 'red':
      return <Exclamation16 color='red' />

    case 'green':
      return <Done16 color='green' />

    case 'blue':
      return <Info16 color='light-blue' />

    case 'yellow':
      return <Exclamation16 color='yellow' />
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAlertInline'
})

export const AlertInline = forwardRef<HTMLDivElement, Props>(function Alert (
  props,
  ref
) {
  const classes = useStyles()
  const { variant, children, className, iconPadding } = props

  return (
    <Container inline flex ref={ref} className={classes.root}>
      <Container
        right={iconPadding}
        flex
        alignItems='center'
        className={classes.iconWrapper}
      >
        {renderAlertIcon(variant)}
      </Container>
      <Typography
        size='medium'
        as='div'
        color='black'
        className={cx(className, classes.content)}
      >
        {children}
      </Typography>
    </Container>
  )
})

AlertInline.defaultProps = {
  variant: 'yellow',
  iconPadding: 'xsmall'
}

AlertInline.displayName = 'AlertInline'

export default AlertInline
