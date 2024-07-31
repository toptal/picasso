import React from 'react'
import type { DropdownProps } from 'react-day-picker'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'
import { ArrowDropDown16 } from '@toptal/picasso-icons'

const CalendarDateSelector = ({
  children,
  caption,
  onChange,
  value,
  'aria-label': ariaLabel,
}: DropdownProps) => {
  return (
    <label
      aria-label={ariaLabel}
      htmlFor={`month${caption}`}
      className='flex relative items-center'
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
        <ArrowDropDown16 className='pointer-events-none' color='darkGrey' />
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
