import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import {
  Exclamation16 as AlertIcon,
  Done16 as Tick,
  Info16 as Info
} from '@toptal/picasso/Icon'
import { Container, Typography } from '@toptal/picasso'
import { VariantType as ContainerVariants } from '@toptal/picasso/Container'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Alert'
})

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
}

export const renderAlertIcon = (variant: Props['variant']) => {
  switch (variant) {
    case 'red':
      return <AlertIcon color='red' />

    case 'green':
      return <Tick color='green' />

    case 'blue':
      return <Info color='light-blue' />

    case 'yellow':
      return <AlertIcon color='yellow' />
  }
}

export const AlertInline = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles(props)
  const { variant, children, className } = props

  return (
    <Container inline flex ref={ref}>
      <Container right='small'>{renderAlertIcon(variant)}</Container>
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
  variant: 'yellow'
}

AlertInline.displayName = 'AlertInline'

export default AlertInline
