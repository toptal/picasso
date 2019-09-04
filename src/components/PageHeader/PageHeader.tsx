import React, {
  useContext,
  useEffect,
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Logo, Container, Typography } from '../'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { StandardProps, usePageHeader } from '../Picasso'
import { useScreenSize, isScreenSize } from '../utils'
import styles from './styles'

type VariantType = 'dark' | 'light'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Title which is displayed along the `Logo` */
  title: string
  /** Link component to wrap `Logo`  */
  logoLink?: ReactElement
  /** Content for the right side of the `Header`  */
  rightContent?: ReactNode
  /** Color variant */
  variant?: VariantType
}

export const PageHeader = forwardRef<HTMLElement, Props>(function PageHeader(
  {
    classes,
    className,
    style,
    title,
    logoLink,
    rightContent,
    variant,
    ...rest
  },
  ref
) {
  const { setHasPageHeader } = usePageHeader()

  const windowSize = useScreenSize()
  const isMobile = isScreenSize('small', windowSize)

  useEffect(() => {
    setHasPageHeader(true)

    return function cleanup() {
      setHasPageHeader(false)
    }
  }, [])

  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  const logo = (
    <Logo variant='white' emblem={isMobile} className={classes.logo} />
  )

  return (
    <header
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx('mui-fixed', classes.root, classes[variant!], className)}
      style={style}
    >
      <div className={contentClassnames}>
        <div className={classes.left}>
          <Container flex alignItems='center'>
            {logoLink ? React.cloneElement(logoLink, {}, logo) : logo}
          </Container>
          {title && !isMobile && (
            <Container left='small' flex alignItems='center'>
              <div className={classes.divider} />
              <Container left='small'>
                <Typography invert weight='light'>
                  {title}
                </Typography>
              </Container>
            </Container>
          )}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </header>
  )
})

PageHeader.defaultProps = {
  variant: 'light'
}

PageHeader.displayName = 'PageHeader'

export default withStyles(styles)(PageHeader)
