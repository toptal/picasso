import type { ReactNode } from 'react'
import React, { forwardRef, useMemo, useRef, useState } from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import { isOverflown } from '@toptal/picasso-utils'
import { ChevronRight16 } from '@toptal/picasso-icons'
import { Typography } from '@toptal/picasso-typography'
import { ButtonAction } from '@toptal/picasso-button'

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
  const [shownMore, setShownMore] = useState(initialExpanded)
  const [needsTruncation, setNeedsTruncation] = useState(true)
  const contentRef = useRef<HTMLSpanElement>(null)
  const content = useMemo(
    () =>
      typeof children === 'string'
        ? replaceLineBreaksWithTags(children)
        : children,
    [children]
  )

  useIsomorphicLayoutEffect(() => {
    const element = contentRef.current

    if (!element || shownMore) {
      return
    }

    const updateNeedsTruncation = () => {
      // Zero size means an unmeasurable environment (jsdom, display: none
      // container) — keep the previous assumption instead of hiding the toggle
      if (element.scrollHeight === 0) {
        return
      }

      setNeedsTruncation(isOverflown(element))
    }

    updateNeedsTruncation()

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(updateNeedsTruncation)

    observer.observe(element)

    return () => observer.disconnect()
  }, [shownMore, content, rows])

  const isContentVisible = rows !== 0 || shownMore
  const formattedContent = shownMore ? (
    content
  ) : (
    <span
      ref={contentRef}
      className='overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] break-words'
      style={{ WebkitLineClamp: rows }}
    >
      {content}
    </span>
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
          className='inline-flex items-center transition-none'
          icon={
            <div className='rotate-90 text-lg/none'>
              <ChevronRight16
                className={twJoin(
                  'text-graphite-700',
                  shownMore && 'rotate-180'
                )}
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
