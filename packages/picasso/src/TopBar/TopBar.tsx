/* eslint-disable complexity */
import React, {
  useContext,
  useLayoutEffect,
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, useTopBar } from '@toptal/picasso-shared'

import Logo from '../Logo'
import Container from '../Container'
import Typography from '../Typography'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { useBreakpoint } from '../utils'
import styles from './styles'

type VariantType = 'dark' | 'light'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Title which is displayed along the `Logo` */
  title?: string
  /** Link component to wrap `Logo`  */
  logoLink?: ReactElement
  /** Content for the left side of the `Header`  */
  leftContent?: ReactNode
  /** Content for the right side of the `Header`  */
  rightContent?: ReactNode
  /** Action items  */
  actionItems?: ReactNode
  /** Color variant */
  variant?: VariantType
}

export const TopBar = forwardRef<HTMLElement, Props>(function TopBar(
  {
    classes,
    className,
    style,
    title,
    logoLink,
    leftContent,
    rightContent,
    actionItems,
    variant,
    ...rest
  },
  ref
) {
  const isCompactLayout = useBreakpoint(['small', 'medium'])

  const { setHasPageHeader } = useTopBar()

  useLayoutEffect(() => {
    setHasPageHeader(true)

    return function cleanup() {
      setHasPageHeader(false)
    }
  }, [setHasPageHeader])

  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const isDark = variant === 'dark'
  const logo = (
    <Logo
      variant={isDark ? 'white' : 'default'}
      emblem={isCompactLayout}
      className={classes.logo}
    />
  )

  const titleComponent = title && (
    <Container left='small' flex alignItems='center'>
      <div
        className={cx(classes.divider, { [classes.dividerBlue]: !isDark })}
      />
      <Container left='small'>
        <Typography invert={isDark} weight='light'>
          {title}
        </Typography>
      </Container>
    </Container>
  )

  const innerClassName = cx(
    {
      [classes.fullWidth]: fullWidth || width === 'full',
      [classes.wide]: width === 'wide'
    },
    classes.content
  )

  return (
    <div className={classes.wrapper}>
      <header
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx('mui-fixed', classes.root, classes[variant!], className)}
        style={style}
      >
        <div className={innerClassName}>
          <div className={classes.left}>
            <Container
              className={classes.logoContainer}
              flex
              alignItems='center'
            >
              {logoLink ? React.cloneElement(logoLink, {}, logo) : logo}
            </Container>
            {!isCompactLayout && titleComponent}
            {leftContent}
          </div>

          <div className={classes.right}>
            {!isCompactLayout && actionItems}
            {rightContent}
          </div>
        </div>
      </header>
    </div>
  )
})

TopBar.defaultProps = {
  variant: 'dark'
}

TopBar.displayName = 'TopBar'

export default withStyles(styles)(TopBar)
