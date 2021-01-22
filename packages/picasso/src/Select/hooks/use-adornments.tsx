import React, { ReactNode } from 'react'

import InputAdornment from '../../InputAdornment'
import Loader from '../../Loader'

export interface Props {
  disabled?: boolean
  position?: 'start' | 'end'
  icon?: ReactNode
  loading?: boolean
}

export const isLoadingAdorment = ({ loading }: Props) => loading
export const isStartAdornment = ({ position, icon }: Props) =>
  position === 'start' && icon
export const isEndAdornment = ({ position, icon }: Props) =>
  position === 'end' && icon

export const useAdornments = (props: Props) => {
  const { disabled, position, icon } = props

  if (isLoadingAdorment(props)) {
    return [
      null,
      <InputAdornment key='loading' position='end' disablePointerEvents>
        <Loader size='small' />
      </InputAdornment>
    ]
  }

  const adornment = (
    <InputAdornment
      disabled={disabled}
      position={position!}
      disablePointerEvents
    >
      {icon}
    </InputAdornment>
  )

  return [
    isStartAdornment(props) ? adornment : null,
    isEndAdornment(props) ? adornment : null
  ]
}

export default useAdornments
