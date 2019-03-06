import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Classes } from '../styles/types'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** Content for the right side of the `Footer`  */
  rightContent?: React.ReactNode
}

const currentYear = new Date().getFullYear()

export const Footer: React.FunctionComponent<Props> = props => {
  const { classes, rightContent, ...rest } = props

  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <footer className={classes.root} {...rest}>
      <div className={contentClassnames}>
        <div className={classes.left}>
          {`© Copyright 2010 – ${currentYear} Toptal, LLC`}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
}

<<<<<<< HEAD
=======
Footer.defaultProps = {
  rightContent: null
}

>>>>>>> 988d087... [FX-42] Migrate manual props docs to auto-generated
export default withStyles(styles)(Footer)
