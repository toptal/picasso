import React from 'react'
import cx from 'classnames'
import { CheckSolid24 } from '@toptal/picasso-icons'
import { toTitleCase } from '@toptal/picasso-utils'
import { useTitleCase } from '@toptal/picasso-shared'
import { TypographyOverflow } from '@toptal/picasso-typography-overflow'
import { Typography } from '@toptal/picasso-typography'

export type Props = {
  /**
   * Sets the step as active
   */
  active?: boolean
  /**
   * Strings or arbitrary content to be displayed as step label
   */
  children?: React.ReactNode
  /**
   * Marks step as completed
   */
  completed?: boolean
  /**
   * Use title case for labels
   */
  titleCase?: boolean
  /**
   * Enable overflow ellipsis for labels
   */
  withOverflowEllipsis?: boolean
  /**
   * Show step label
   */
  expand?: boolean
}

export const Step = (props: Props) => {
  const {
    active,
    children,
    completed,
    withOverflowEllipsis,
    expand,
    titleCase: propsTitleCase,
  } = props
  const titleCase = useTitleCase(propsTitleCase)

  const labelElement = expand ? (
    <Typography
      as='span'
      size='xxsmall'
      weight='semibold'
      className='leading-[1em]'
    >
      {titleCase ? toTitleCase(children) : children}
    </Typography>
  ) : null

  return (
    <div className='flex flex-row items-center gap-2'>
      <div
        className={cx(
          'h-[1.5em] w-[1.5em] flex justify-center items-center rounded-[50%] shrink-0',
          {
            'bg-white border border-gray-500 border-solid':
              !active && !completed,
            'bg-blue-500 text-white': active,
            'text-green-600': completed,
          }
        )}
      >
        {completed && <CheckSolid24 />}
      </div>
      {expand ? (
        withOverflowEllipsis ? (
          <span className='grid'>
            <TypographyOverflow>{labelElement}</TypographyOverflow>
          </span>
        ) : (
          labelElement
        )
      ) : null}
    </div>
  )
}

Step.displayName = 'Step'

export default Step
