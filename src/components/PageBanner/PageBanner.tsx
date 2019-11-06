import React, {
  ReactNode,
  forwardRef,
  HTMLAttributes,
  ReactElement
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { BaseProps } from '../Picasso'
import Container, { VariantType } from '../Container'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components */
  children: ReactNode
  /** Color variant of Banner */
  variant?: VariantType
  /** Add <Icon /> before Banner content  */
  icon?: ReactElement
}

const useStyles = makeStyles<Theme, Props>(styles)

export const PageBanner = forwardRef<HTMLDivElement, Props>(function PageBanner(
  props,
  ref
) {
  const { className, style, children, variant, icon, ...rest } = props
  const classes = useStyles(props)

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
})

PageBanner.defaultProps = {
  variant: 'yellow'
}

PageBanner.displayName = 'PageBanner'

export default PageBanner
