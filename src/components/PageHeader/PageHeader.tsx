import React, {
  useContext,
  FunctionComponent,
  ReactNode,
  ReactElement
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Logo, Container, Typography } from '../'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'dark' | 'light'

export interface Props extends StandardProps {
  /** Title which is displayed along the `Logo` */
  title: string
  /** Link component to wrap `Logo`  */
  logoLink?: ReactElement
  /** Content for the right side of the `Header`  */
  rightContent?: ReactNode
  /** Color variant */
  variant?: VariantType
}

export const PageHeader: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  title,
  logoLink,
  rightContent,
  variant
}) => {
  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  const logo = <Logo variant='white' />

  return (
    <header
      className={cx('mui-fixed', classes.root, classes[variant!], className)}
      style={style}
    >
      <div className={contentClassnames}>
        <div className={classes.left}>
          <Container right='small' flex direction='row' alignItems='center'>
            {logoLink ? React.cloneElement(logoLink, {}, logo) : logo}
          </Container>
          {title && (
            <React.Fragment>
              <div className={classes.divider} />
              <Container left='small'>
                <Typography invert weight='light'>
                  {title}
                </Typography>
              </Container>
            </React.Fragment>
          )}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </header>
  )
}

PageHeader.defaultProps = {
  variant: 'light'
}

PageHeader.displayName = 'PageHeader'

export default withStyles(styles)(PageHeader)
