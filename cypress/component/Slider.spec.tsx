import React from 'react'
import type { SliderProps } from '@toptal/picasso'
import { Slider, Typography, Container } from '@toptal/picasso'

const TestSlider = ({
  value = undefined,
  onChange,
  tooltipFormat,
}: Partial<SliderProps> = {}) => (
  <Container style={{ width: '600px' }} padded='medium'>
    <Slider
      data-testid='slider'
      value={value}
      min={0}
      max={23}
      onChange={onChange}
      tooltipFormat={tooltipFormat}
      tooltip='on'
      disablePortal
      compact
    />
  </Container>
)

const renderLabel = (value: number | number[]) => {
  let formattedVal = String(value)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const component = 'Slider'

describe('Slider', () => {
  it('renders range with tooltips intersect', () => {
    cy.mount(<TestSlider value={[10, 11]} tooltipFormat={renderLabel} />)

    cy.contains('GMT+10:00').should('be.visible')
    cy.get('body').happoScreenshot({
      component,
      variant: 'range/when-tooltip-intersect',
    })
  })
})
