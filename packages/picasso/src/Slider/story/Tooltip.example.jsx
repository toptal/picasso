import React from 'react'
import { Container, Slider, Typography } from '@toptal/picasso'

const renderLabel = val => {
  let formattedVal = String(val)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal
  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const TooltipExample = () => {
  return (
    <Container>
      <Container>
        <Typography variant='heading' size='small'>
          Display persistently
        </Typography>
        <Container top='large'>
          <Slider valueLabelDisplay='on' />
        </Container>
      </Container>
      <Container top='large'>
        <Typography variant='heading' size='small'>
          Display when the thumb is hovered or focused
        </Typography>
        <Container top='large'>
          <Slider valueLabelDisplay='auto' />
        </Container>
      </Container>
      <Container top='large'>
        <Typography variant='heading' size='small'>
          Custom rendered label
        </Typography>
        <Container top='large'>
          <Slider
            min={0}
            max={23}
            valueLabelDisplay='on'
            valueLabelFormat={renderLabel}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default TooltipExample
