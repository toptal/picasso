import React from 'react'
import { Container, Slider, Typography } from '@toptal/picasso'

const formatLabel = (val: any) => {
  const formattedVal = val.length === 2 ? val : '0' + val

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  return (
    <Container padded='small'>
      <Container>
        <Typography variant='heading' size='small'>
          Display persistently
        </Typography>
        <Container top='large'>
          <Slider tooltip='on' compact />
        </Container>
      </Container>
      <Container top='large'>
        <Typography variant='heading' size='small'>
          Display when the thumb is hovered or focused
        </Typography>
        <Container top='large'>
          <Slider tooltip='auto' compact />
        </Container>
      </Container>
      <Container top='large'>
        <Typography variant='heading' size='small'>
          Custom rendered label
        </Typography>
        <Container top='xlarge'>
          <Slider
            min={0}
            max={23}
            tooltip='on'
            tooltipFormat={formatLabel}
            compact
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
