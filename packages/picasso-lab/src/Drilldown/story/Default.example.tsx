import { Container } from '@toptal/picasso'
import { Drilldown } from '@toptal/picasso-lab'
import React from 'react'

const Example = () => {
  const childC = (
    <Drilldown>
      <Drilldown.Item>Item C1</Drilldown.Item>
      <Drilldown.Item>Item C2</Drilldown.Item>
    </Drilldown>
  )

  const childD3 = (
    <Drilldown>
      <Drilldown.Item>Item D3-1</Drilldown.Item>
      <Drilldown.Item>Item D3-2</Drilldown.Item>
    </Drilldown>
  )

  const childD = (
    <Drilldown>
      <Drilldown.Item>Item D1</Drilldown.Item>
      <Drilldown.Item>Item D2</Drilldown.Item>
      <Drilldown.Item drilldown={childD3}>Item D3</Drilldown.Item>
      <Drilldown.Item>Item D4</Drilldown.Item>
      <Drilldown.Item>Item D5</Drilldown.Item>
    </Drilldown>
  )

  return (
    <Container style={{ width: '240px' }}>
      <Drilldown>
        <Drilldown.Item>Item A</Drilldown.Item>
        <Drilldown.Item>Item B</Drilldown.Item>
        <Drilldown.Item drilldown={childC}>Item C</Drilldown.Item>
        <Drilldown.Item drilldown={childD}>Item D</Drilldown.Item>
        <Drilldown.Item>Item E</Drilldown.Item>
      </Drilldown>
    </Container>
  )
}

export default Example
