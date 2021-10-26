import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'

interface Props extends BaseProps {}

export const NonNativeSelectLoader = ({ 'data-testid': dataTestId }: Props) => {
  return (
    <ScrollMenu data-testid={dataTestId}>
      <Container padded='small'>
        <Loader size='small' />
      </Container>
    </ScrollMenu>
  )
}

export default NonNativeSelectLoader
