import React, { useState } from 'react'
import { Transitions, SPACING_6 } from '@toptal/picasso-utils'
import { Button, Container } from '@toptal/picasso'
import { ArrowDownMinor24 } from '@toptal/picasso/Icon'

const Example = () => {
  const [isRotated, setIsRotated] = useState(false)

  return (
    <>
      <Button onClick={() => setIsRotated(!isRotated)}>Rotate</Button>

      <Container top={SPACING_6}>
        <Transitions.Rotate180 on={isRotated}>
          <ArrowDownMinor24 />
        </Transitions.Rotate180>
      </Container>
    </>
  )
}

export default Example
