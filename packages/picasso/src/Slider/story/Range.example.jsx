import React from 'react'
import { Slider, Typography, Container } from '@toptal/picasso'

const renderLabel = val => {
  let formattedVal = String(val)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  const [value, setValue] = React.useState([0, 23])

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Typography variant='heading' size='small'>
        Time Zone
      </Typography>
      <Container top='large'>
        <Slider
          value={value}
          min={0}
          max={23}
          onChange={handleChange}
          tooltip='on'
          tooltipFormat={renderLabel}
          compact
        />
      </Container>
    </Container>
  )
}

export default Example
