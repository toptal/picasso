import React from 'react'
import { CheckMinor24, CheckMinor16 } from '@toptal/picasso-icons'

import { InputAdornment } from '../InputAdornment'

export interface Props {
  'data-testid'?: string
  multiline?: boolean
}

const InputValidIconAdornment = ({
  'data-testid': dataTestId,
  multiline,
}: Props) => {
  if (multiline) {
    return <CheckMinor16 color='green' data-testid={dataTestId} />
  }

  return (
    <InputAdornment position='end'>
      <CheckMinor24 color='green' data-testid={dataTestId} />
    </InputAdornment>
  )
}

export default InputValidIconAdornment
