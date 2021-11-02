import { mount } from '@cypress/react'
import { Container } from '@toptal/picasso'
import DatePicker, { DatePickerProps } from '@toptal/picasso-lab/DatePicker'
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

  it('renders allow custom value', () => {
    mount(<TestDatePicker allowCustomValue value='some random text' />)

    cy.get('body').happoScreenshot()
  })
})
