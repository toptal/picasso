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

export const PageFooter: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  rightContent,
  elementSelector
}) => {
  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <footer
      className={cx(classes.root, className)}
      style={style}
      data-qa={elementSelector}
    >
      <div className={contentClassnames}>
        <div className={classes.left}>
          {`© Copyright 2010 – ${currentYear} Toptal, LLC`}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
}

PageFooter.defaultProps = {
  rightContent: null
}

PageFooter.displayName = 'PageFooter'

export default withStyles(styles)(PageFooter)
