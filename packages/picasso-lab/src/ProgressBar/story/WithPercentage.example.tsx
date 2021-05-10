import React from 'react'
import { Container } from '@toptal/picasso'
import { ProgressBar } from '@toptal/picasso-lab'

const Example = () => (
  <Container flex direction='column' style={{ maxWidth: '200px' }}>
    <Container top='small'>
      <ProgressBar value={0} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={10} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={20} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={30} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={40} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={50} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={60} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={70} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={80} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={90} showPercentage />
    </Container>
    <Container top='small'>
      <ProgressBar value={100} showPercentage />
    </Container>
  </Container>
)

export default Example
