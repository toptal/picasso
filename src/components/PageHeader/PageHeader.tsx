import React, { useContext, FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Link, Logo, Container, Typography } from '../'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Title which is displayed along the `Logo` */
  title: string
  /** URL of the page the `Logo` link goes to  */
  logoHref?: string
  /** Content for the right side of the `Header`  */
  rightContent?: ReactNode
}

interface LinkWrapperProps {
  href?: string
  children: ReactNode
}

const LinkWrapper = (props: LinkWrapperProps) => {
  const { href, children } = props

  if (href) {
    return (
      <Link href={href} underline='none'>
        {children}
      </Link>
    )
  } else {
    return <React.Fragment>{children}</React.Fragment>
  }
}

export const PageHeader: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  title,
  logoHref,
  rightContent
}) => {
  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <header className={cx(classes.root, className)} style={style}>
      <div className={contentClassnames}>
        <div className={classes.left}>
          <Container right='small' flex direction='row' alignItems='center'>
            <LinkWrapper href={logoHref}>
              <Logo variant='white' />
            </LinkWrapper>
          </Container>
          <div className={classes.divider} />
          <Container left='small'>
            <Typography invert weight='light'>
              {title}
            </Typography>
          </Container>
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </header>
  )
}

PageHeader.displayName = 'PageHeader'

export default withStyles(styles)(PageHeader)
