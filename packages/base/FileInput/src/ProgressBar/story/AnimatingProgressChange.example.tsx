import React, { useState } from 'react'
import { Container, Button, ProgressBar } from '@toptal/picasso'
import { SPACING_8, SPACING_4 } from '@toptal/picasso/utils'

const AnimatingProgressChange = () => {
  const [percentage, setPercentage] = useState(10)

  return (
    <Container
      flex
      direction='column'
      bottom={SPACING_8}
      style={{ width: '200px' }}
    >
      <ProgressBar value={percentage} showPercentage />
      <Container flex direction='row' top={SPACING_4}>
        <Button
          variant='primary'
          disabled={percentage <= 0}
          onClick={() => setPercentage(percentage - 10)}
        >
          Decrease
        </Button>
        <Button
          variant='primary'
          disabled={percentage >= 100}
          onClick={() => setPercentage(percentage + 10)}
        >
          Increase
        </Button>
      </Container>
    </Container>
  )
}

export default AnimatingProgressChange
