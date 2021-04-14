import React, { ReactNode, useMemo } from 'react'

import InputAdornment from '../../../InputAdornment'

export interface Props {
  disabled?: boolean
  position: 'start' | 'end'
  icon?: ReactNode
}

export const useAdornments = ({ disabled, position, icon }: Props) =>
  useMemo(() => {
    const adornment = icon ? (
      <InputAdornment
        disabled={disabled}
        position={position}
        disablePointerEvents
      >
        {icon}
      </InputAdornment>
    ) : null

    const startAdornment = position === 'start' ? adornment : null
    const endAdornment = position === 'end' ? adornment : null

    return [startAdornment, endAdornment]
  }, [disabled, position, icon])

export default useAdornments
