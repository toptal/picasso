import React from 'react'
import { Slider, Grid } from '@toptal/picasso'

const SelectDefaultExample = () => {
  const handleChange = (event, value) => {
    window.console.log('onChange: ', value)
  }

  return (
    <Grid>
      <Grid.Item small={12}>
        <Slider onChange={handleChange} />
      </Grid.Item>
    </Grid>
  )
}

export default SelectDefaultExample
