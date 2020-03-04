import React from 'react'
import { Container, Slider, Tooltip } from '@toptal/picasso'

const BottomTooltip = ({ children, open, value }) => (
  <Tooltip arrow placement='bottom' open={open} content={value}>
    {children}
  </Tooltip>
)

const CustomSliderTooltip = () => {
  const handleChange = (event, value) => {
    window.console.log('onChange: ', value)
  }

  return (
    <Container>
      <Slider
        onChange={handleChange}
        tooltip='auto'
        TooltipComponent={BottomTooltip}
      />
    </Container>
  )
}

export default CustomSliderTooltip
