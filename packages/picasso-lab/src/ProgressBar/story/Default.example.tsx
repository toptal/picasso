import React from 'react'
import { Container } from '@toptal/picasso'
import { ProgressBar } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Container flex direction='column' style={{ maxWidth: '200px' }}>
      <Container top='small'>
        <ProgressBar value={10} />
      </Container>
      <Container top='small'>
        <ProgressBar value={20} />
      </Container>
      <Container top='small'>
        <ProgressBar value={30} />
      </Container>
      <Container top='small'>
        <ProgressBar value={40} />
      </Container>
      <Container top='small'>
        <ProgressBar value={50} />
      </Container>
      <Container top='small'>
        <ProgressBar value={60} />
      </Container>
      <Container top='small'>
        <ProgressBar value={70} />
      </Container>
      <Container top='small'>
        <ProgressBar value={80} />
      </Container>
      <Container top='small'>
        <ProgressBar value={90} />
      </Container>
      <Container top='small'>
        <ProgressBar value={100} />
      </Container>
    </Container>
  )
}

export default Example
