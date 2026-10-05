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

const openList = () => cy.get('button[aria-label="Choose time"]').click()

describe('TimePicker', () => {
  describe('when minuteStep is provided and the clock button is clicked', () => {
    it('renders the list of times', () => {
      cy.mount(<TestTimePicker minuteStep={15} />)

      openList()

      cy.get('[role="listbox"]').should('be.visible')
      cy.get('body').happoScreenshot({
        component,
        variant: 'time-list',
      })
    })
  })

  describe('when a time is clicked', () => {
    it('updates the field and closes the list', () => {
      cy.mount(<TestTimePicker minuteStep={15} />)

      openList()
      // The labels follow the 12/24-hour setting of the machine running the test
      cy.contains('[role="option"]', /^(19:15|07:15 PM)$/).click()

      cy.get('input[type="time"]').should('have.value', '19:15')
      cy.get('[role="listbox"]').should('not.exist')
    })
  })
})
