import React from 'react'
import { CounterBlock } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const MultilineExample = () => (
  <section>
    <CounterBlock.Group>
      <CounterBlock value='$26,125,123.70' label='Outstanding' color='yellow' />
      <CounterBlock value='$5,837,806.68' label='Overdue' color='red' />
      <CounterBlock value='$1,232,107.99' label='Disputed' color='red' />
      <CounterBlock value='$1,722,076.43' label='Incollections' color='red' />
    </CounterBlock.Group>
    <Container top='xsmall'>
      <CounterBlock.Group>
        <CounterBlock value='$935,590.65' label='Written off' color='red' />
        <CounterBlock
          value='$5,758,716.46'
          label='Pending receipt'
          color='blue'
        />
        <CounterBlock value='$44,244,163.83' label='Credited' color='yellow' />
        <CounterBlock value='$585,895,606.35' label='Paid' color='green' />
      </CounterBlock.Group>
    </Container>
  </section>
)

export default MultilineExample
