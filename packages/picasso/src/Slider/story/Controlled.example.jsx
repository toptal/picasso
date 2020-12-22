import React, { useState } from 'react'
import { Button, Grid, Slider } from '@toptal/picasso'
import { Plus16, Minus16 } from '@toptal/picasso/Icon'

const Example = () => {
  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid alignItems='center'>
      <Grid.Item small={6}>
        <Grid alignItems='center'>
          <Grid.Item>
            <Button
              onClick={() => setValue(value - 1)}
              variant='secondary'
              size='small'
              icon={<Minus16 />}
            >
              Zoom out
            </Button>
          </Grid.Item>
          <Grid.Item small>
            <Slider value={value} onChange={handleChange} max={5} />
          </Grid.Item>
          <Grid.Item>
            <Button
              onClick={() => setValue(value + 1)}
              variant='secondary'
              size='small'
              icon={<Plus16 />}
            >
              Zoom In
            </Button>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  )
}

export default Example
