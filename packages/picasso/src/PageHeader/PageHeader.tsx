import React, {
  useContext,
  useLayoutEffect,
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import cx from 'classnames'
import {
  mergeClasses,
  StandardProps,
  usePageHeader
} from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoPageHeader'
})

export const PageHeader = forwardRef<HTMLElement, Props>(function PageHeader(
  props,
  ref
) {
  const {
    classes: externalClasses,
    className,
    style,
    title,
    logoLink,
    leftContent,
    rightContent,
    actionItems,
    variant,
    ...rest
  } = props
  const classes = mergeClasses(useStyles(props), externalClasses)
  const isCompactLayout = useBreakpoint(['small', 'medium'])

  const { setHasPageHeader } = usePageHeader()

  useLayoutEffect(() => {
    setHasPageHeader(true)

    return function cleanup() {
      setHasPageHeader(false)
    }
  }, [setHasPageHeader])

  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const logo = (
    <Logo variant='white' emblem={isCompactLayout} className={classes.logo} />
  )

  const titleComponent = title && (
    <Container left='small' flex alignItems='center'>
      <div className={classes.divider} />
      <Container left='small'>
        <Typography invert weight='light'>
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

PageHeader.defaultProps = {
  variant: 'light'
}

PageHeader.displayName = 'PageHeader'

export default PageHeader
