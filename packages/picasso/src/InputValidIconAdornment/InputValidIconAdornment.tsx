import React from 'react'

import { CheckMinor24 } from '../Icon'
import InputAdornment from '../InputAdornment'

export interface Props {
  'data-testid'?: string
}

const ValidIconAdornment = ({ 'data-testid': dataTestId }: Props) => (
  <InputAdornment position='end'>
    <CheckMinor24 color='green' data-testid={dataTestId} />
  </InputAdornment>
)

export default ValidIconAdornment
