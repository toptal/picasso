/* eslint-disable complexity */
import type { ReactNode, ReactElement, HTMLAttributes } from 'react'
import React, { useContext, forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { usePageTopBar } from '@toptal/picasso-provider'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import Logo from '../Logo'
import Container from '../Container'
import PageHamburger, {
  PageHamburgerPortal,
  useHamburgerContext,
} from '../PageHamburger'
import Typography from '../Typography'
import { PageContext } from '../Page'
import type { PageContextProps } from '../Page/types'
import { useBreakpoint, useIsomorphicLayoutEffect } from '../utils'
import styles from './styles'

type VariantType = 'dark' | 'light' | 'grey'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Title which is displayed along the `Logo` */
  title?: string
  /** Link component to wrap `Logo`  */
  logoLink?: ReactElement
  /** Logo to display */
  logo?: ReactNode
  /** Content for the center of the `Header`  */
  centerContent?: ReactNode
  /** Content for the left side of the `Header`  */
  leftContent?: ReactNode
  /** Content for the right side of the `Header`  */
  rightContent?: ReactNode
  /** Action items  */
  actionItems?: ReactNode
  /** Color variant */
  variant?: VariantType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTopBar',
})

export const PageTopBar = forwardRef<HTMLElement, Props>(function PageTopBar(
  props,
  ref
) {
  const {
    className,
    style,
    title,
    logoLink,
    logo,
    centerContent,
    leftContent,
    rightContent,
    actionItems,
    variant = 'dark',
    ...rest
  } = props
  const classes = useStyles()
  const isCompactLayout = useBreakpoint(['sm', 'md'])

  const { setHasTopBar } = usePageTopBar()

  useIsomorphicLayoutEffect(() => {
    setHasTopBar(true)

    return function cleanup() {
      setHasTopBar(false)
    }
  }, [setHasTopBar])

  const { width, fullWidth } = useContext<PageContextProps>(PageContext)
  const { hamburgerId } = useHamburgerContext()

  const isDark = ['dark', 'grey'].includes(variant)

  const logoDefault = (
    <Logo
      variant={isDark ? 'white' : 'default'}
      emblem={isCompactLayout}
      className={classes.logo}
    />
  )

  const logoComponent = logo || logoDefault

  const titleComponent = title && (
    <Container left='small' flex alignItems='center'>
      <div
        className={cx(classes.divider, { [classes.dividerBlue]: !isDark })}
      />
      <Container left='small'>
        <Typography invert={isDark}>{title}</Typography>
      </Container>
    </Container>
  )

  const responsiveCenterContent = isCompactLayout ? (
    <PageHamburgerPortal>{centerContent}</PageHamburgerPortal>
  ) : (
    <Container flex alignItems='center'>
      {centerContent}
    </Container>
  )

  const innerClassName = cx(
    {
      [classes.fullWidth]: fullWidth || width === 'full',
      [classes.wide]: width === 'wide',
    },
    classes.content
  )

  return (
    <div className={classes.wrapper}>
      <header
        {...rest}
        ref={ref}
        className={cx('mui-fixed', classes.root, classes[variant], className)}
        style={style}
      >
        <div className={innerClassName}>
          <div className={classes.left}>
            <Container
              className={classes.logoContainer}
              flex
              alignItems='center'
            >
              {logoLink
                ? React.cloneElement(logoLink, {}, logoComponent)
                : logoComponent}
            </Container>
            {!isCompactLayout && titleComponent}
            {leftContent}
          </div>

          {centerContent && responsiveCenterContent}

          <div className={classes.right}>
            {!isCompactLayout && actionItems}
            {rightContent}
          </div>
        </div>
      </header>
      <PageHamburger id={hamburgerId} />
    </div>
  )
})

PageTopBar.defaultProps = {
  variant: 'dark',
}

PageTopBar.displayName = 'PageTopBar'

export default PageTopBar
