import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Button } from '@toptal/picasso-button'
export interface Props {
  handleZoom: (step: number) => void
  scaleCoefficient: number
}

export const Zoom = ({ handleZoom, scaleCoefficient }: Props) => {
  return (
    <Container>
      <Button size='small' onClick={() => handleZoom(1 - scaleCoefficient)}>
        &minus;
      </Button>
      <Button size='small' onClick={() => handleZoom(1 + scaleCoefficient)}>
        +
      </Button>
    </Container>
  )
}

export default Zoom
