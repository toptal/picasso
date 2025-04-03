/* eslint-disable complexity */
import type { ReactNode, ReactElement, HTMLAttributes } from 'react'
import React, { useContext, forwardRef, useEffect } from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import {
  usePageTopBar,
  useSidebar,
  usePreventPageWidthChangeOnScrollbar,
  useScreenSize,
} from '@toptal/picasso-provider'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Logo } from '@toptal/picasso-logo'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { PageContext } from '../Page'
import type { PageContextProps } from '../Page'
import {
  PageHamburger,
  PageHamburgerPortal,
  useHamburgerContext,
} from '../PageHamburger'
import styles from './styles'

const SMALL_SCREEN_WIDTH = 1280

type VariantType = 'dark' | 'light' | 'grey' | 'black'

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
  /** Test identifiers */
  testIds?: {
    hamburger?: string
  }
}

export const PageTopBarContext = React.createContext<{ variant: VariantType }>({
  variant: 'dark',
})

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
    testIds,
    ...rest
  } = props
  const classes = useStyles()

  const { setHasTopBar } = usePageTopBar()
  const { preventPageWidthChangeOnScrollbar } =
    usePreventPageWidthChangeOnScrollbar()

  useIsomorphicLayoutEffect(() => {
    setHasTopBar(true)

    return () => {
      setHasTopBar(false)
    }
  }, [setHasTopBar])

  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const { hamburgerId, setHasPageHamburger } = useHamburgerContext()

  const screenSize = useScreenSize()
  const isSmallScreen = screenSize < SMALL_SCREEN_WIDTH

  const { hasSidebar } = useSidebar()

  const showHamburger = isSmallScreen && (hasSidebar || !!centerContent)

  useEffect(() => {
    setHasPageHamburger(showHamburger)

    return () => setHasPageHamburger(false)
  }, [setHasPageHamburger, showHamburger])

  const isDark = ['dark', 'grey', 'black'].includes(variant)
  const logoVariant = isDark ? 'white' : 'default'
  const logoDefault = (
    <>
      <Logo variant={logoVariant} emblem className='inline md:hidden' />
      <Logo variant={logoVariant} className='hidden md:inline' />
    </>
  )

  const logoComponent = logo || logoDefault

  const titleComponent = title && (
    <Container className='hidden lg:flex' alignItems='center'>
      <div
        className={twMerge(
          'w-[1px] h-[1.5em] bg-white opacity-80',
          isDark ? 'bg-white' : 'bg-blue-700'
        )}
      />
      <Container left='small'>
        <Typography invert={isDark}>{title}</Typography>
      </Container>
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
    <PageTopBarContext.Provider value={{ variant }}>
      <div className='relative h-[var(--header-height,3.5rem)] min-h-[var(--header-height,3.5rem)]'>
        <header
          {...rest}
          ref={ref}
          className={cx(
            'mui-fixed',
            'fixed top-0 left-0 right-0 w-full text-[1rem] z-[1100]',
            classes[variant],
            className,
            {
              'md:w-screen': preventPageWidthChangeOnScrollbar,
            }
          )}
          style={style}
        >
          <div className={innerClassName}>
            {/*  Left part: Hamburger, Logo, Tagline, Search bar */}
            <div className={classes.left}>
              <Container flex alignItems='center' gap='small'>
                {showHamburger && (
                  <PageHamburger
                    id={hamburgerId}
                    data-testid={testIds?.hamburger}
                  />
                )}
                {logoLink
                  ? React.cloneElement(logoLink, {}, logoComponent)
                  : logoComponent}
                {titleComponent}
              </Container>
              {leftContent}
            </div>

            {/* Center part: inline menu */}
            {centerContent &&
              (isSmallScreen ? (
                <PageHamburgerPortal>
                  <div className={classes.centerContentPortal}>
                    {centerContent}
                  </div>
                </PageHamburgerPortal>
              ) : (
                <Container className={classes.centerContent}>
                  {centerContent}
                </Container>
              ))}
            {/* Right part: Action items, User menu, Notifications */}

            <div className={classes.right}>
              {actionItems}
              {rightContent}
            </div>
          </div>
        </header>
      </div>
    </PageTopBarContext.Provider>
  )
})

PageTopBar.defaultProps = {
  variant: 'dark',
}

PageTopBar.displayName = 'PageTopBar'

export default PageTopBar
