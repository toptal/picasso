import React, { useContext, FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import styles from './styles'

interface Props extends StandardProps {
  /** Content for the right side of the `Footer`  */
  rightContent?: ReactNode
}

const currentYear = new Date().getFullYear()

export const Footer: FunctionComponent<Props> = ({
  classes,
  className,
  style,
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
    <footer className={cx(classes.root, className)} style={style}>
      <div className={contentClassnames}>
        <div className={classes.left}>
          {`© Copyright 2010 – ${currentYear} Toptal, LLC`}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  rightContent: null
}

Footer.displayName = 'Footer'

export default withStyles(styles)(Footer)
