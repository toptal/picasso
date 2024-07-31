import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

export interface Props {
  isSelected: boolean
  isToday: boolean
  isIndicated: boolean
}

export const CalendarIndicators = ({
  isIndicated,
  isSelected,
  isToday,
}: Props) => {
  if (isToday || isIndicated) {
    return (
      <div className='flex flex-row	justify-around w-[1.3em] absolute bottom-[0.375rem]'>
        {isToday && (
          <div
            className={twJoin(
              'h-[0.25rem] w-[0.25rem] rounded-[50%] bg-blue-500',
              isSelected && 'bg-white'
            )}
          />
        )}
        {isIndicated && (
          <div className='content-[""] h-[0.25rem] w-[0.25rem] rounded-[50%] bg-yellow-500' />
        )}
      </div>
    )
  }

  return null
}
