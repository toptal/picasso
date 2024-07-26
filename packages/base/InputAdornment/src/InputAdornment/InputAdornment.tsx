import type { ReactNode, HTMLAttributes, MouseEvent } from 'react'
import React, { useCallback } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { noop } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

type PositionType = 'start' | 'end'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  position: PositionType
  disabled?: boolean
  disablePointerEvents?: boolean
  stopPropagation?: boolean
  'data-testid'?: string
}

const InputAdornment = (props: Props) => {
  const {
    className,
    style,
    children,
    position,
    disabled,
    disablePointerEvents,
    stopPropagation,
    'data-testid': dataTestId,
    onClick = noop,
    ...rest
  } = props

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (stopPropagation) {
        event.stopPropagation()
      }

      onClick(event)
    },
    [onClick, stopPropagation]
  )

  return (
    <div
      {...rest}
      className={twMerge(
        'text-graphite-700 h-auto flex items-center whitespace-nowrap max-h-[2em]',
        disabled && 'text-opacity-[0.48]',
        position === 'end' &&
          'justify-end ml-auto flex-grow-0 flex-shrink-0 basis-auto',
        disablePointerEvents && 'pointer-events-none',
        className
      )}
      style={style}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {children}
    </div>
  )
}

export default InputAdornment
