import React from 'react'
import { mount } from '@cypress/react'
import { Slider, SliderProps, Typography, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestSlider = ({
  value = undefined,
  onChange,
  tooltipFormat
}: Partial<SliderProps> = {}) => (
  <TestingPicasso>
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
  </TestingPicasso>
)

const renderLabel = (value: number | number[]) => {
  let formattedVal = String(value)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

describe('Slider', () => {
  it('renders single', () => {
    mount(<TestSlider value={10} />)

    cy.get('body').happoScreenshot()
  })

  it('renders range', () => {
    mount(<TestSlider value={[10, 20]} tooltipFormat={renderLabel} />)

    cy.get('body').happoScreenshot()
  })

  it('renders range with tooltips intersect', () => {
    mount(<TestSlider value={[10, 11]} tooltipFormat={renderLabel} />)

    cy.get('body').happoScreenshot()
  })
})
