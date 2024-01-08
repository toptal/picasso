import type { ReactNode } from 'react'
import React, { forwardRef, useMemo, useCallback, useState } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Truncate from 'react-truncate'
import type { BaseProps } from '@toptal/picasso-shared'
import { ChevronRightIcon16 } from '@toptal/picasso-icons'
import { Typography } from '@toptal/picasso-typography'
import { ButtonAction } from '@toptal/picasso-button'

import styles from './styles'
import { replaceLineBreaksWithTags } from './utils'

export interface Props extends BaseProps {
  /** Content of the component */
  children: ReactNode
  /** Number of lines displayed initially */
  rows?: number
  /** Text used by action link showing whole content */
  moreText?: string
  /** Text used by action link hiding whole content */
  lessText?: string
  /** Define component initial state, whether it should be collapsed or not */
  initialExpanded?: boolean
  /** Define whether action link should be displayed or not */
  disableToggle?: boolean
  /** Callback triggered when show more/less is clicked */
  onToggle?: (nextState: boolean) => void
  testIds?: {
    contentWrapper?: string
    toggleButton?: string
  }
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
    testIds,
    ...rest
  } = props
  const classes = useStyles()
  const [shownMore, setShownMore] = useState(initialExpanded)
  const [needsTruncation, setNeedsTruncation] = useState(true)
  const content = useMemo(
    () =>
      typeof children === 'string'
        ? replaceLineBreaksWithTags(children)
        : children,
    [children]
  )
  const handleNeedsTruncation = useCallback(
    (truncated: boolean) => setNeedsTruncation(truncated),
    [setNeedsTruncation]
  )

  const isContentVisible = rows !== 0 || shownMore
  const formattedContent = shownMore ? (
    content
  ) : (
    <Truncate onTruncate={handleNeedsTruncation} lines={rows}>
      {content}
    </Truncate>
  )

  return (
    <>
      <Typography
        {...rest}
        ref={ref}
        size='medium'
        color='dark-grey'
        className={className}
        style={style}
        data-testid={testIds?.contentWrapper}
      >
        {isContentVisible && formattedContent}
      </Typography>
      {!disableToggle && needsTruncation && (
        <ButtonAction
          onClick={() => {
            const nextState = !shownMore

            setShownMore(nextState)
            onToggle(nextState)
          }}
          className={classes.toggleText}
          icon={
            <div className={classes.iconWrapper}>
              <ChevronRightIcon16
                className={cx(classes.icon, {
                  [classes.expandedIcon]: shownMore,
                })}
              />
            </div>
          }
          iconPosition='right'
          data-testid={testIds?.toggleButton}
        >
          {shownMore ? lessText : moreText}
        </ButtonAction>
      )}
    </>
  )
})

ShowMore.displayName = 'ShowMore'

export default ShowMore
