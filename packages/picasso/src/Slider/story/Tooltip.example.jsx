import React from 'react'
import { Container, Slider, Typography } from '@toptal/picasso'

const formatLabel = val => {
  let formattedVal = String(val)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal
  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const SliderTooltipExample = () => {
  return (
    <Container padded='small'>
      <Container>
        <Typography variant='heading' size='small'>
          Display persistently
        </Typography>
        <Container top='large'>
          <Slider tooltip='on' />
        </Container>
      </Container>
      <Container top='large'>
        <Typography variant='heading' size='small'>
          Display when the thumb is hovered or focused
        </Typography>
        <Container top='large'>
          <Slider tooltip='auto' />
        </Container>
      </Container>
      <Container top='large'>
        <Typography variant='heading' size='small'>
          Custom rendered label
        </Typography>
        <Container top='large'>
          <Slider min={0} max={23} tooltip='on' tooltipFormat={formatLabel} />
        </Container>
      </Container>
    </Container>
  )
}

export default SliderTooltipExample
