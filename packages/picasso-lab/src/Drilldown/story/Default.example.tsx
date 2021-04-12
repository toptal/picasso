import { Drilldown } from '@toptal/picasso-lab'
import React from 'react'

const Example = () => {
  const handleClick = () => {
    window.alert('Drilldown item is clicked')
  }

  return (
    <Drilldown>
      <Drilldown.Item onClick={handleClick}>First item</Drilldown.Item>
      <Drilldown.Item onClick={handleClick}>Second item</Drilldown.Item>
      <Drilldown.Item onClick={handleClick}>Third item</Drilldown.Item>
    </Drilldown>
  )
}

export default Example
