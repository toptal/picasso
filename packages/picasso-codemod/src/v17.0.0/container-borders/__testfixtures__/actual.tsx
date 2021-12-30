// prettier-ignore

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Container } from '@toptal/picasso'

export default () => (
  <>
    <Container>text</Container>
    <Container variant='red'>text</Container>
    <Container variant='white'>text</Container>
    <Container variant='red' bordered>text</Container>
    <Container variant='white' bordered>text</Container>
    <Container variant='transparent' bordered>text</Container>
    <Container variant={undefined} bordered>text</Container>
    <Container bordered>text</Container>
  </>
)
