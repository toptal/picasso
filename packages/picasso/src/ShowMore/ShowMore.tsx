import React, { forwardRef, useState } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Truncate from 'react-truncate'
import { BaseProps } from '@toptal/picasso-shared'

import ChevronRightIcon16 from '../Icon/ChevronRight16'
import Typography from '../Typography'
import styles from './styles'
import Button from '../Button'

export interface Props extends BaseProps {
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

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoShowMore' })

export const ShowMore = forwardRef<HTMLSpanElement, Props>(function ShowMore(
  props,
  ref
) {
  const {
    children,
    rows = 4,
    initialExpanded = false,
    disableToggle = false,
    moreText = 'Show more',
    lessText = 'Show less',
    onToggle = () => {},
    className,
    style,
    ...rest
  } = props
  const classes = useStyles()
  const [shownMore, setShownMore] = useState(initialExpanded)

  return (
    <>
      <Typography
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
        <Button.Action
          onClick={() => {
            setShownMore(!shownMore)
            onToggle()
          }}
          className={classes.toggleText}
          iconPosition='right'
        >
          {shownMore ? lessText : moreText}
          <div className={classes.iconWrapper}>
            <ChevronRightIcon16
              className={cx(classes.icon, {
                [classes.expandedIcon]: shownMore
              })}
            />
          </div>
        </Button.Action>
      )}
    </>
  )
})

ShowMore.displayName = 'ShowMore'

export default ShowMore
