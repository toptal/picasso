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

  const isCenterContentMovedToHamburger = useBreakpoint([
    'xs',
    'sm',
    'md',
    'lg',
  ])

  const showEmlemOnly = useBreakpoint(['xs', 'sm'])
  const showTagline = useBreakpoint(['lg', 'xl'])

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
    <Logo variant={isDark ? 'white' : 'default'} emblem={showEmlemOnly} />
  )

  const logoComponent = logo || logoDefault

  const titleComponent = title && (
    <Container flex alignItems='center'>
      <div
        className={cx(classes.divider, { [classes.dividerBlue]: !isDark })}
      />
      <Container left='small'>
        <Typography invert={isDark}>{title}</Typography>
      </Container>
    </Container>
  )

  const responsiveCenterContent = isCenterContentMovedToHamburger ? (
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
          {/*  Left part: Hamburger, Logo, Tagline, Search bar */}
          <div className={classes.left}>
            <Container flex alignItems='center' gap='small'>
              <PageHamburger id={hamburgerId} />
              {logoLink
                ? React.cloneElement(logoLink, {}, logoComponent)
                : logoComponent}
              {showTagline && titleComponent}
            </Container>
            {leftContent}
          </div>

          {/* Center part: inline menu */}
          {centerContent && responsiveCenterContent}

          {/* Right part: Action items, User menu, Notifications */}
          <div className={classes.right}>
            {actionItems}
            {rightContent}
          </div>
        </div>
      </header>
    </div>
  )
})

PageTopBar.defaultProps = {
  variant: 'dark',
}

PageTopBar.displayName = 'PageTopBar'

export default PageTopBar
