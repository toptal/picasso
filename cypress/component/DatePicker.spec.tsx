import { mount } from '@cypress/react'
import { Container } from '@toptal/picasso'
import {
  DatePicker,
  DatePickerProps,
  DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT,
  datePickerParseDateString
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

  it('renders custom value', () => {
    const parseInputValue = (value: string) => {
      const result = datePickerParseDateString(value, {
        dateFormat: DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT
      })

      return result ?? value
    }

    mount(
      <TestDatePicker
        parseInputValue={parseInputValue}
        value='some random text'
      />
    )

    cy.get('body').happoScreenshot()
  })
})
