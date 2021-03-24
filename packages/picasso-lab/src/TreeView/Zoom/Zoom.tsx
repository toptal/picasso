import React, { FC } from 'react'
import { Button, Container } from '@toptal/picasso'

export interface Props {
  handleZoom: (step: number) => void
  scaleCoefficient: number
}

export const Zoom: FC<Props> = ({ handleZoom, scaleCoefficient }) => {
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
