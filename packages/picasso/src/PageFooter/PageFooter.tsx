import React, { useContext, forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Content for the right side of the `Footer`  */
  rightContent?: ReactNode
}

const currentYear = new Date().getFullYear()

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPageFooter'
})

export const PageFooter = forwardRef<HTMLElement, Props>(function PageFooter(
  props,
  ref
) {
  const { className, style, rightContent, ...rest } = props
  const classes = useStyles()
  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth || width === 'full',
      [classes.wide]: width === 'wide'
    },
    classes.content
  )

  return (
    <footer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <div className={contentClassnames}>
        <div className={classes.left}>
          {`© Copyright 2010 – ${currentYear} Toptal, LLC`}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
})

PageFooter.defaultProps = {
  rightContent: null
}

PageFooter.displayName = 'PageFooter'

export default PageFooter
