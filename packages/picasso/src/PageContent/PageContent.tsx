import React, { useContext, forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'
import { useSidebar } from '@toptal/picasso-provider'

import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
  /** Use flexbox */
  flex?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPageContent'
})

export const PageContent = forwardRef<HTMLDivElement, Props>(
  function PageContent (props, ref) {
    const { children, className, style, flex, ...rest } = props

    const classes = useStyles()
    const { width, fullWidth } = useContext<PageContextProps>(PageContext)
    const { hasSidebar } = useSidebar()

    const innerClassName = cx(
      {
        [classes.fullWidth]: fullWidth || width === 'full',
        [classes.wide]: width === 'wide',
        [classes.flex]: flex
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
  flex: true
}

PageContent.displayName = 'PageContent'

export default PageContent
