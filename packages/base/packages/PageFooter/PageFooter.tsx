/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { useContext, forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { PageContext } from '@toptal/picasso-page'
import type { PageContextProps } from '@toptal/picasso-page/types'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Content for copyright. You can override default if needed. */
  copyrightContent?: ReactNode
  /** Content for the right side of the `Footer`  */
  rightContent?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPageFooter',
})

export const PageFooter = forwardRef<HTMLElement, Props>(function PageFooter(
  props,
  ref
) {
  const { className, style, rightContent, copyrightContent, ...rest } = props
  const classes = useStyles()
  const { width, fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth || width === 'full',
      [classes.wide]: width === 'wide',
    },
    classes.content
  )

  return (
    <footer
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <div className={contentClassnames}>
        <div className={classes.left}>{copyrightContent}</div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
})

const CopyrightContent = () => (
  <>{`© Copyright 2010 – ${new Date().getFullYear()} Toptal, LLC`}</>
)

PageFooter.defaultProps = {
  rightContent: null,
  copyrightContent: <CopyrightContent />,
}

PageFooter.displayName = 'PageFooter'

export default PageFooter
