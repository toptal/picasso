import React, { useState } from 'react'
import { Slider, Button, Grid } from '@toptal/picasso'
import { Plus16, Minus16 } from '@toptal/picasso/Icon'

const SelectDefaultExample = () => {
  const [sliderValue, setSliderValue] = useState(0)
  const handleSliderChange = (_, value) => {
    setSliderValue(value)
  }

  return (
    <Grid alignItems='center'>
      <Grid.Item small={6}>
        <Grid alignItems='center'>
          <Grid.Item>
            <Button
              onClick={() => setSliderValue(sliderValue - 1)}
              variant='flat'
              size='small'
              icon={<Minus16 />}
            >
              Zoom out
            </Button>
          </Grid.Item>
          <Grid.Item small>
            <Slider value={sliderValue} onChange={handleSliderChange} max={5} />
          </Grid.Item>
          <Grid.Item>
            <Button
              onClick={() => setSliderValue(sliderValue + 1)}
              variant='flat'
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

export default SelectDefaultExample
