import React, { ReactNode, ChangeEvent } from 'react'
import { Container, Slider, Tooltip } from '@toptal/picasso'

const BottomTooltip = ({
  children,
  open,
  value
}: {
  children: ReactNode
  open: boolean
  value: ReactNode
}) => (
  <Tooltip placement='bottom' open={open} content={value} compact>
    {children}
  </Tooltip>
)

const CustomSliderTooltip = () => {
  const handleChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    window.console.log('onChange: ', value)
  }

  return (
    <Container>
      <Slider
        onChange={handleChange}
        tooltip='auto'
        TooltipComponent={BottomTooltip}
        compact
      />
    </Container>
  )
}

export default CustomSliderTooltip
