import React, {
  ReactNode,
  forwardRef,
  HTMLAttributes,
  ReactElement
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '../Picasso'
import Container, { VariantType as ContainerVariantType } from '../Container'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Children components */
  children: ReactNode
  /** Color variant of Banner */
  variant?: ContainerVariantType
  /** Add <Icon /> before Banner content  */
  icon?: ReactElement
}

// eslint-disable-next-line react/display-name
export const PageBanner = forwardRef<HTMLDivElement, Props>(function PageBanner(
  { classes, className, style, children, variant, icon, ...rest },
  ref
) {
  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      variant={variant}
      padded='medium'
      flex
    >
      {icon && (
        <Container flex alignItems='center' className={classes.iconWrapper}>
          {icon}
        </Container>
      )}
      {children}
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement>

PageBanner.defaultProps = {
  variant: 'yellow'
}

PageBanner.displayName = 'Page.Banner'

export default withStyles(styles)(PageBanner) as PicassoComponentWithRef<
  Props,
  HTMLDivElement
>
