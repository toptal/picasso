import React from 'react'
import type { DropdownProps } from 'react-day-picker'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import { twJoin } from '@toptal/picasso-tailwind-merge'
import { FOCUS_RING } from '@toptal/picasso-shared'

const CalendarDateSelector = ({
  children,
  caption,
  onChange,
  value,
  'aria-label': ariaLabel,
}: DropdownProps): React.ReactElement => {
  return (
    <label
      aria-label={ariaLabel}
      htmlFor={`month${caption}`}
      className={twJoin(
        'flex relative items-center rounded-sm',
        // The select is invisible, so its label shows its focus
        FOCUS_RING.blue.hasFocusVisible
      )}
    >
      <Typography
        variant='heading'
        size='medium'
        color='black'
        weight='semibold'
      >
        {caption}
      </Typography>
      <Container
        className='w-6 h-6'
        flex
        justifyContent='center'
        alignItems='center'
      >
        <ArrowDownMinor16 className='pointer-events-none' color='darkGrey' />
      </Container>
      <select
        name={`month${caption}`}
        className='absolute opacity-0 text-md font-normal cursor-pointer'
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </label>
  )
}

export default CalendarDateSelector
