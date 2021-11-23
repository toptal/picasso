import { mount } from '@cypress/react'
import { Container } from '@toptal/picasso'
import {
  DatePicker,
  DatePickerProps
} from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { noop } from '@toptal/picasso/utils'
import React from 'react'

const TestDatePicker = (props: Partial<DatePickerProps>) => {
  const value = props.value || new Date(2020, 11, 27)

  return (
    <TestingPicasso>
      <Container padded='medium'>
        <DatePicker onChange={noop} value={value} {...props} />
      </Container>
    </TestingPicasso>
  )
}

describe('DatePicker', () => {
  it('renders autofocus', () => {
    mount(<TestDatePicker autoFocus />)

    cy.get('body').happoScreenshot()
  })

  it('renders range', () => {
    mount(
      <TestDatePicker
        range
        value={[new Date(2020, 11, 23), new Date(2020, 11, 27)]}
      />
    )

    cy.get('body').happoScreenshot()
  })

  it('renders value parsed by custom value parser', () => {
    const parseInputValue = (value: string) => {
      return new Date(parseInt(value), 0, 1)
    }

    mount(
      <TestDatePicker
        parseInputValue={parseInputValue}
        value={new Date(2020, 0, 1)}
        testIds={{
          input: 'date-picker-input'
        }}
      />
    )

    cy.get('[data-testid=date-picker-input]').clear().type('2015')

    cy.get('body').happoScreenshot()
  })
})
