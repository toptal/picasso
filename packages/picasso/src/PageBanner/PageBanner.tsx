import React, {
  ReactNode,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, SpacingType } from '@toptal/picasso-shared'

import Container, { VariantType } from '../Container'
import styles from './styles'
import { useScreens } from '../utils'
import { PageContextProps } from '../Page/types'
import { PageContext } from '../Page/Page'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components */
  children: ReactNode
  /** Color variant of Banner */
  variant?: VariantType
  /** Add <Icon /> before Banner content  */
  icon?: ReactElement
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoPageBanner'
})

export const PageBanner = forwardRef<HTMLDivElement, Props>(function PageBanner(
  props,
  ref
) {
  const { className, style, children, variant, icon, ...rest } = props
  const classes = useStyles(props)
  const screens = useScreens<SpacingType>()
  const { fullWidth } = useContext<PageContextProps>(PageContext)
  const contentPadding = screens(
    {
      small: 'xsmall',
      medium: 'xsmall'
    },
    'small'
  )

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      variant={variant}
      flex
    >
      <Container
        variant={variant}
        className={cx({ [classes.fullWidth]: fullWidth }, classes.content)}
        padded={contentPadding}
        flex
      >
        {icon && (
          <Container flex alignItems='center' className={classes.iconWrapper}>
            {icon}
          </Container>
        )}
        {children}
      </Container>
    </Container>
  )
})

PageBanner.defaultProps = {
  variant: 'yellow'
}

PageBanner.displayName = 'PageBanner'

export default PageBanner
