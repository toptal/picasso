import React, { forwardRef, useState } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Truncate from 'react-truncate'

import { StandardProps } from '../Picasso'
import ChevronRightIcon16 from '../Icon/ChevronRight16'
import Typography from '../Typography'
import Link from '../Link'
import styles from './styles'

export interface Props extends StandardProps {
  /** Content of the component */
  children: string
  /** Number of characters displayed initially */
  rows?: number
  /** Text used by action link showing whole content */
  moreText?: string
  /** Text used by action link hiding whole content */
  lessText?: string
  /** Define component initial state, whether it should be collapsed or not */
  initialExpanded?: boolean
  /** Define whether action link should be displayed or not */
  disableToggle?: boolean
  /** Callback tiggered when show more/less is clicked */
  onToggle?: () => void
}

export const ShowMore = forwardRef<HTMLSpanElement, Props>(function ShowMore(
  {
    children,
    rows = 4,
    initialExpanded = false,
    disableToggle = false,
    classes: { expandedIcon, icon, toggleText, iconWrapper },
    moreText = 'Show more',
    lessText = 'Show less',
    onToggle = () => {},
    className,
    style,
    ...rest
  },
  ref
) {
  const [shownMore, setShownMore] = useState(initialExpanded)

  return (
    <React.Fragment>
      <Typography
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        size='medium'
        color='dark-grey'
        className={className}
        style={style}
      >
        <Truncate lines={!shownMore && rows}>{children}</Truncate>
      </Typography>
      {!disableToggle && (
        <Link
          onClick={() => {
            setShownMore(!shownMore)
            onToggle()
          }}
          className={toggleText}
          underline='none'
        >
          <Typography size='medium' color='blue'>
            {shownMore ? lessText : moreText}
          </Typography>
          <div className={iconWrapper}>
            <ChevronRightIcon16
              className={cx(icon, {
                [expandedIcon]: shownMore
              })}
            />
          </div>
        </Link>
      )}
    </React.Fragment>
  )
})

ShowMore.displayName = 'ShowMore'

export default withStyles(styles)(ShowMore)
