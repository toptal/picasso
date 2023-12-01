/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import Container from '@toptal/picasso-container'
import Loader from '@toptal/picasso-loader'
import SelectOptions from '@toptal/picasso-select-options'

interface Props extends BaseProps {}

export const NonNativeSelectLoader = ({ 'data-testid': dataTestId }: Props) => {
  return (
    <SelectOptions data-testid={dataTestId}>
      <Container padded='small'>
        <Loader size='small' />
      </Container>
    </SelectOptions>
  )
}

export default NonNativeSelectLoader
