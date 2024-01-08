import React from 'react'
import { Slider, Typography, Container, Grid } from '@toptal/picasso'

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
      <Grid alignItems='center' spacing={16}>
        <Grid.Item sm={1}>
          <Typography align='center' size='medium'>
            {firstValue}
          </Typography>
        </Grid.Item>
        <Grid.Item sm={10}>
          <Slider
            value={value}
            min={0}
            max={23}
            onChange={handleChange}
            tooltip='on'
            tooltipFormat={renderLabel}
            compact
          />
        </Grid.Item>
        <Grid.Item sm={1}>
          <Typography align='center' size='medium'>
            {secondValue}
          </Typography>
        </Grid.Item>
      </Grid>
    </Container>
  )
}

export default Example
