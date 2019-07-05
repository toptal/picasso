import React, {
  useContext,
  FunctionComponent,
  ReactNode,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
}

export const PageContent: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style,
  ...rest
}) => {
  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const innerClassName = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...rest} className={cx(classes.root, className)} style={style}>
      <div className={innerClassName}>{children}</div>
    </div>
  )
}

PageContent.displayName = 'PageContent'

export default withStyles(styles)(PageContent)
