import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { Loader } from '@toptal/picasso-loader'

export interface Props {
  disabled?: boolean
  position: 'start' | 'end'
  icon?: ReactNode
  loading?: boolean
}

export const useAdornments = ({ disabled, position, icon, loading }: Props) =>
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
    const endIconAdornment = position === 'end' ? adornment : null
    const endAdornment = loading ? (
      <InputAdornment key='loading' position='end' disablePointerEvents>
        <Loader size='small' />
      </InputAdornment>
    ) : (
      endIconAdornment
    )

    return [startAdornment, endAdornment]
  }, [disabled, position, icon, loading])

export default useAdornments
