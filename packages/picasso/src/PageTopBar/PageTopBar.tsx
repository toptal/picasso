/* eslint-disable complexity */
import React, {
  useContext,
  useLayoutEffect,
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  useEffect
} from 'react'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { usePageTopBar } from '@toptal/picasso-provider'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Logo from '../Logo'
import Container from '../Container'
import Typography from '../Typography'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { useBreakpoint } from '../utils'
import styles from './styles'

type VariantType = 'dark' | 'light'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
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

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTopBar'
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
    leftContent,
    rightContent,
    actionItems,
    variant = 'dark',
    ...rest
  } = props
  const classes = useStyles()
  const isCompactLayout = useBreakpoint(['small', 'medium'])

  const { setHasTopBar } = usePageTopBar()

  ;(typeof window !== 'undefined' ? useLayoutEffect : useEffect)(() => {
    setHasTopBar(true)

    return function cleanup() {
      setHasTopBar(false)
    }
  }, [setHasTopBar])

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
        <Typography invert={isDark}>{title}</Typography>
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

PageTopBar.defaultProps = {
  variant: 'dark'
}

PageTopBar.displayName = 'PageTopBar'

export default PageTopBar
