import React, { useState } from 'react'
import { Grid, Slider, Typography } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(Number(newValue))
  }

  return (
    <Grid alignItems='center'>
      <Grid.Item sm={6}>
        <Grid alignItems='center'>
          <Grid.Item sm>
            <Slider value={value} onChange={handleChange} max={100} />
          </Grid.Item>
          <Grid.Item>
            <Typography size='medium'>{value}</Typography>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  )
}

export default Example
