import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { Time16 } from '@toptal/picasso-icons'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  /** Whether the time dropdown is shown */
  open: boolean
  /** Whether the trigger ignores clicks */
  disabled?: boolean
  /** Called when the trigger is clicked */
  onClick: () => void
}

const preventFocusLoss = (event: React.MouseEvent) => event.preventDefault()

export const TimePickerTrigger = ({
  open,
  disabled,
  onClick,
  className,
  style,
  'data-testid': dataTestId,
}: Props) => (
  <InputAdornment position='end'>
    {/* Touch devices keep the native picker: the button lets taps through to the browser's own picker indicator underneath */}
    <button
      type='button'
      tabIndex={-1}
      aria-label='Choose time'
      aria-haspopup='dialog'
      aria-expanded={open}
      disabled={disabled}
      onMouseDown={preventFocusLoss}
      onClick={onClick}
      className={twMerge(
        'absolute right-[0.625rem] flex m-0 p-0 border-none bg-white text-inherit select-none',
        'cursor-pointer disabled:cursor-default',
        'pointer-events-none pointer-fine:pointer-events-auto',
        className
      )}
      style={style}
      data-testid={dataTestId}
    >
      <Time16 />
    </button>
  </InputAdornment>
)

TimePickerTrigger.displayName = 'TimePickerTrigger'

export default TimePickerTrigger
