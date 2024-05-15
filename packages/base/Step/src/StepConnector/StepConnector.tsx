import React from 'react'
import { ChevronRight16 as ChevronRightIcon } from '@toptal/picasso-icons'

export type Props = { direction: 'vertical' | 'horizontal' }

export const StepConnector = ({ direction }: Props) => {
  if (direction === 'vertical') {
    return <div className='h-4' />
  }

  return <ChevronRightIcon className='text-gray-400' />
}

StepConnector.displayName = 'StepConnector'

export default StepConnector
