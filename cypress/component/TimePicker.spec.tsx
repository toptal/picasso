import type { TimePickerProps } from '@toptal/picasso'
import { Container, TimePicker } from '@toptal/picasso'
import React, { useState } from 'react'

const TestTimePicker = (props: Partial<TimePickerProps>) => {
  const [value, setValue] = useState(props.value ?? '18:30')

  return (
    <Container padded='medium'>
      <TimePicker {...props} onChange={setValue} value={value} />
    </Container>
  )
}

const component = 'TimePicker'

const openPicker = () => cy.get('button[aria-label="Choose time"]').click()

describe('TimePicker', () => {
  describe('when the clock button is clicked', () => {
    it('renders the hour and minute columns', () => {
      cy.mount(<TestTimePicker />)

      openPicker()

      cy.get('[role="dialog"]').should('be.visible')
      cy.get('body').happoScreenshot({
        component,
        variant: 'columns',
      })
    })
  })

  describe('when column labels are provided', () => {
    it('renders them above the columns', () => {
      cy.mount(<TestTimePicker hourLabel='Std' minuteLabel='Min' />)

      openPicker()

      cy.get('[role="listbox"][aria-label="Std"]').should('be.visible')
      cy.get('body').happoScreenshot({
        component,
        variant: 'column-labels',
      })
    })
  })

  describe('when a minute is clicked', () => {
    it('updates the field', () => {
      cy.mount(<TestTimePicker />)

      openPicker()
      cy.get('[role="listbox"][aria-label="Minute"]').contains('45').click()

      cy.get('input[type="time"]').should('have.value', '18:45')
    })
  })
})
