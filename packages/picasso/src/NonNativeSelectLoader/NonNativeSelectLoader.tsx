import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import { SPACING_4 } from '../utils'
import Loader from '../Loader'
import SelectOptions from '../SelectOptions'

interface Props extends BaseProps {}

export const NonNativeSelectLoader = ({ 'data-testid': dataTestId }: Props) => {
  return (
    <SelectOptions data-testid={dataTestId}>
      <Container padded={SPACING_4}>
        <Loader size='small' />
      </Container>
    </SelectOptions>
  )
}

export default NonNativeSelectLoader
