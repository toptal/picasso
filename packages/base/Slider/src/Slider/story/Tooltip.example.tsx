import React, { useState } from 'react'
import { Container, Slider, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_10 } from '@toptal/picasso-utils'

type Value = number

const formatLabel = (value: Value) => {
  const formattedVal = String(value).padStart(2, '0')

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)
  const handleChange1 = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue1(newValue)
  }
  const handleChange2 = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue2(newValue)
  }
  const handleChange3 = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue3(newValue)
  }

  return (
    <Container padded={SPACING_4}>
      <Container>
        <Typography variant='heading' size='small'>
          Display persistently
        </Typography>
        <Container top={SPACING_8}>
          <Slider value={value1} onChange={handleChange1} tooltip='on' />
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          Display when the thumb is hovered or focused
        </Typography>
        <Container top={SPACING_8}>
          <Slider value={value2} onChange={handleChange2} tooltip='auto' />
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          Custom rendered label
        </Typography>
        <Container top={SPACING_10}>
          <Slider
            min={0}
            max={23}
            tooltip='on'
            value={value3}
            onChange={handleChange3}
            tooltipFormat={formatLabel}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
