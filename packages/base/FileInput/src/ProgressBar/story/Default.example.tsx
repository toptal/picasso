import React from 'react'
import { Container, ProgressBar } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => {
  return (
    <Container flex direction='column' style={{ maxWidth: '200px' }}>
      <Container top={SPACING_4}>
        <ProgressBar value={0} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={10} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={20} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={30} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={40} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={50} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={60} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={70} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={80} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={90} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={100} />
      </Container>
    </Container>
  )
}

export default Example
