import React from 'react'
import { Slider, Typography, Container } from '@toptal/picasso'

type Value = number | number[]

const renderLabel = (value: Value) => {
  let formattedVal = String(value)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  const [value, setValue] = React.useState<Value>([10, 20])

  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(newValue)
  }

  const [firstValue, secondValue] = Array.isArray(value) ? value : [0, value]

  return (
    <Container>
      <Typography variant='heading' size='small'>
        Time Zone
      </Typography>
      <Container
        top='xlarge'
        flex
        alignItems='center'
        justifyContent='center'
        gap='medium'
      >
        <Typography size='medium'>{firstValue}</Typography>
        <Slider
          value={value}
          min={0}
          max={23}
          onChange={handleChange}
          tooltip='on'
          tooltipFormat={renderLabel}
          compact
        />
        <Typography size='medium'>{secondValue}</Typography>
      </Container>
    </Container>
  )
}

export default Example
