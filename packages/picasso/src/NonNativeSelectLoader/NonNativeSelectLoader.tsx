import React from 'react'

import Container from '../Container'
import Loader from '../Loader'
import ScrollMenu from '../ScrollMenu'

export const NonNativeSelectLoader = () => {
  return (
    <ScrollMenu data-testid='loader'>
      <Container padded='small'>
        <Loader size='small' />
      </Container>
    </ScrollMenu>
  )
}

export default NonNativeSelectLoader
