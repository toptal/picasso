import React from 'react'
import type { SliderProps } from '@toptal/picasso'
import { Slider, Typography, Container } from '@toptal/picasso'

import { toHaveStyle, toMatchFocusVisible } from '../support/focus'

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

// blue-500 at 48%, serialized as rgba() or oklab()
const FOCUS_SHADOW = / 0\.48\) 0px 0px 0px 3px$/

// Base UI hides the pointer focus ring via `focus({ focusVisible })`
const supportsFocusVisibleOption = () => {
  let supported = false

  document.createElement('button').focus({
    get focusVisible() {
      supported = true

      return false
    },
  } as FocusOptions)

  return supported
}

const itWithFocusVisibleOption = supportsFocusVisibleOption() ? it : it.skip

describe('Slider', () => {
  it('renders range with tooltips intersect', () => {
    cy.mount(<TestSlider value={[10, 11]} tooltipFormat={renderLabel} />)

    cy.contains('GMT+10:00').should('be.visible')
    cy.get('body').happoScreenshot({
      component,
      variant: 'range/when-tooltip-intersect',
    })
  })

  describe('when thumb is focused', () => {
    it('shows focus shadow on keyboard focus', () => {
      cy.mount(
        <>
          <button>Before</button>
          <Slider />
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.get('[role=slider] input')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
      cy.get('[role=slider]').should(toHaveStyle('boxShadow', FOCUS_SHADOW))
    })

    itWithFocusVisibleOption(
      'does not show focus shadow on mouse focus',
      () => {
        cy.mount(<Slider />)

        cy.get('[role=slider]').realClick()

        cy.get('[role=slider] input')
          .should('have.focus')
          .and(toMatchFocusVisible(false))
        cy.waitForTransitionsToSettle('[role=slider]').should(
          toHaveStyle('boxShadow', FOCUS_SHADOW, { expected: false })
        )
      }
    )
  })
})
