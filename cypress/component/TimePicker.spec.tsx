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
const list = '[role="listbox"]'

const openList = () => {
  cy.get('button[aria-label="Choose time"]').click()
  cy.waitForOverlayOpen(list)
}

// TimePicker learns the 12/24-hour format of the native field by measuring a
// hidden probe input, and that format comes from the machine running the test.
// Answering for the probe keeps both formats covered wherever the test runs.
const forceHourCycle = (hourCycle: 12 | 24) =>
  cy.window().then(win =>
    Object.defineProperty(win.HTMLInputElement.prototype, 'offsetHeight', {
      configurable: true,
      get(this: HTMLInputElement) {
        if (this.dataset.probedSegment === 'ampm') {
          return hourCycle === 12 ? win.innerHeight : 0
        }

        return Object.getOwnPropertyDescriptor(
          win.HTMLElement.prototype,
          'offsetHeight'
        )?.get?.call(this)
      },
    })
  )

describe('TimePicker', () => {
  afterEach(() =>
    cy
      .window()
      .then(win =>
        Reflect.deleteProperty(win.HTMLInputElement.prototype, 'offsetHeight')
      )
  )

  describe('when minuteStep is provided and the clock button is clicked', () => {
    it('renders the list of times', () => {
      cy.mount(<TestTimePicker minuteStep={15} />)

      openList()

      cy.get('body').happoScreenshot({
        component,
        variant: 'time-list',
      })
    })
  })

  describe('when the field shows a 24-hour clock', () => {
    it('renders the times in 24-hour format', () => {
      cy.mount(<TestTimePicker minuteStep={30} value='12:00' />)

      forceHourCycle(24)
      openList()

      cy.contains('[role="option"]', /^13:00$/).should('be.visible')
      cy.get(list).happoScreenshot({
        component,
        variant: 'time-list/24-hour',
      })
    })
  })

  describe('when the field shows a 12-hour clock', () => {
    it('renders the times with AM and PM', () => {
      cy.mount(<TestTimePicker minuteStep={30} value='12:00' />)

      forceHourCycle(12)
      openList()

      cy.contains('[role="option"]', /^01:00 PM$/).should('be.visible')
      cy.contains('[role="option"]', /^11:30 AM$/).should('be.visible')
      cy.get(list).happoScreenshot({
        component,
        variant: 'time-list/am-pm',
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
      cy.get(list).should('not.exist')
    })
  })
})
