import React from 'react'
import { Container, Slider, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_10 } from '@toptal/picasso-utils'

type Value = number | number[]

const formatLabel = (value: Value) => {
  let formattedVal = String(value)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + value

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  return (
    <Container padded={SPACING_4}>
      <Container>
        <Typography variant='heading' size='small'>
          Display persistently
        </Typography>
        <Container top={SPACING_8}>
          <Slider tooltip='on' />
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          Display when the thumb is hovered or focused
        </Typography>
        <Container top={SPACING_8}>
          <Slider tooltip='auto' />
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          Custom rendered label
        </Typography>
        <Container top={SPACING_10}>
          <Slider min={0} max={23} tooltip='on' tooltipFormat={formatLabel} />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
