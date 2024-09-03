import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  /** Timeline row content */
  children: ReactNode
  /** Icon for the row between lines */
  icon?: ReactElement
  /** Timeline row date */
  date?: string
  /** Whether to render a connector line after the row */
  hasConnector?: boolean
  testIds?: {
    dot?: string
    connector?: string
  }
}

const tableCellClasses = 'table-cell align-top h-full'

const TimelineRow = ({
  className,
  children,
  icon,
  date,
  hasConnector,
  'data-testid': dataTestId,
  testIds = {},
}: Props) => {
  return (
    <Container
      data-testid={dataTestId}
      className={twMerge('table-row group', className)}
    >
      <Container className={tableCellClasses}>
        <Container
          flex
          direction='column'
          alignItems='center'
          right='medium'
          className='h-full'
        >
          {typeof icon !== 'undefined' ? (
            React.cloneElement(icon, {
              className: twJoin(
                icon.props.className,
                'my-1 mx-0 text-gray-600'
              ),
            })
          ) : (
            <div
              className='
            w-4 h-4 flex items-center justify-center bg-white my-1 mx-0

            [&:after]:content-[""]
            [&:after]:w-[9px]
            [&:after]:h-[9px]
            [&:after]:bg-gray-600
            [&:after]:rounded-[50%] [&:after]:leading-5
            '
              data-testid={testIds.dot}
            />
          )}
          {hasConnector && (
            <div
              className='flex-1 w-0 border-dashed border-0 border-l border-gray-600'
              data-testid={testIds.connector}
            />
          )}
        </Container>
      </Container>

      {date && (
        <Container
          className={tableCellClasses}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Container className='flex-[0_0_auto]' right='large'>
            <Typography className='leading-6' weight='semibold' size='medium'>
              {date}
            </Typography>
          </Container>
        </Container>
      )}

      <Container className={tableCellClasses}>
        <Container className='grow group-last:mb-0' bottom='large'>
          {children}
        </Container>
      </Container>
    </Container>
  )
}

TimelineRow.defaultProps = {
  hasConnector: true,
}

TimelineRow.displayName = 'TimelineRow'

export default TimelineRow
