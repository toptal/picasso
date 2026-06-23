import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

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
        {/* TODO(tokens): [PF-1994] 80px / 29px min-widths and 18px line-height are off the Picasso scales */}
        <div className='w-full min-w-[5rem] h-2 bg-gray-300 rounded-sm'>
          <div
            className='h-2 rounded-sm bg-blue-400 transition-[width] duration-300 ease-in-out'
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
              className='min-w-[1.8125rem] leading-[1.125rem]'
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
