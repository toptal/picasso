import React from 'react'
import { Container, ProgressBar } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <Container flex direction='column' style={{ maxWidth: '200px' }}>
    <Container top={SPACING_4}>
      <ProgressBar value={0} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={10} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={20} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={30} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={40} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={50} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={60} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={70} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={80} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={90} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={100} showPercentage />
    </Container>
  </Container>
)

export default Example
