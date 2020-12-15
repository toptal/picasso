import React, { useContext, forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, useSidebar } from '@toptal/picasso-shared'

import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
  /** Use flexbox */
  flex?: boolean
}

export const PageContent = forwardRef<HTMLDivElement, Props>(
  function PageContent(
    { children, classes, className, style, flex, ...rest },
    ref
  ) {
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
        // eslint-disable-next-line react/jsx-props-no-spreading
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

export default withStyles(styles)(PageContent)
