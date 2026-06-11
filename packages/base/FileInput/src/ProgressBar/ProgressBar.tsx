import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

import {
  progressBarClasses,
  progressIndicatorClasses,
  percentageValueClasses,
} from './styles'

const MIN_VALUE = 0
const MAX_VALUE = 100

export interface Props extends BaseProps {
  /** Percentage of completed progress */
  value: number
  /** Whether to show percentage value */
  showPercentage?: boolean
  'data-testid'?: string
}

const normalizeValue = (value: number) =>
  Math.min(Math.max(value, MIN_VALUE), MAX_VALUE)

export const ProgressBar = forwardRef<HTMLDivElement, Props>(
  function ProgressBar({ showPercentage = false, ...props }, ref) {
    const { value, 'data-testid': dataTestId, ...restProps } = props

    const percentage = normalizeValue(value)

    return (
      <Container
        flex
        direction='row'
        alignItems='center'
        data-testid={dataTestId}
        {...restProps}
        ref={ref}
      >
        <div className={progressBarClasses}>
          <div
            className={progressIndicatorClasses}
            style={{
              width: `${props.value}%`,
            }}
          />
        </div>

        {showPercentage && (
          <Container left='xsmall'>
            <Typography
              variant='body'
              size='xsmall'
              weight='semibold'
              className={percentageValueClasses}
            >
              {percentage}%
            </Typography>
          </Container>
        )}
      </Container>
    )
  }
)

export default ProgressBar
