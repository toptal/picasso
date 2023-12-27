/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { useContext, forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { useSidebar } from '@toptal/picasso-provider'
import { PageContext } from '@toptal/picasso-page'
import type { PageContextProps } from '@toptal/picasso-page/types'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
  /** Use flexbox */
  flex?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPageContent',
})

export const PageContent = forwardRef<HTMLDivElement, Props>(
  function PageContent(props, ref) {
    const { children, className, style, flex, ...rest } = props

    const classes = useStyles()
    const { width, fullWidth } = useContext<PageContextProps>(PageContext)
    const { hasSidebar } = useSidebar()

    const innerClassName = cx(
      {
        [classes.fullWidth]: fullWidth || width === 'full',
        [classes.wide]: width === 'wide',
        [classes.flex]: flex,
      },
      classes.content
    )

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(
          classes.root,
          { [classes.hasSidebar]: hasSidebar },
          className
        )}
        style={style}
      >
        <div className={innerClassName}>{children}</div>
      </div>
    )
  }
)

PageContent.defaultProps = {
  flex: true,
}

PageContent.displayName = 'PageContent'

export default PageContent
