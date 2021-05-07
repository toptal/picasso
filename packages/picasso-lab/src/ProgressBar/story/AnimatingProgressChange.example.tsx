import React, { useState } from 'react'
import { Container, Button } from '@toptal/picasso'
import { ProgressBar } from '@toptal/picasso-lab'

const AnimatingProgressChange = () => {
  const [percentage, setPercentage] = useState(10)

  return (
    <Container
      flex
      direction='column'
      bottom='large'
      style={{ width: '200px' }}
    >
      <ProgressBar value={percentage} showPercentage />
      <Container flex direction='row' top='small'>
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
