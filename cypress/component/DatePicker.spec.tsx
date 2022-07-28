import {
  Container,
  DatePicker,
  DatePickerProps,
  Link,
  Typography,
} from '@toptal/picasso'
import React, { useState } from 'react'

const TestDatePicker = (props: Partial<DatePickerProps>) => {
  const [value, setValue] = useState<DatePickerProps['value']>(
    props.value || new Date(2020, 11, 27)
  )

  return (
    <Container padded='medium'>
      <DatePicker {...props} onChange={setValue} value={value} />
    </Container>
  )
}

const component = 'DatePicker'

describe('DatePicker', () => {
  it('renders autofocus', () => {
    cy.mount(<TestDatePicker autoFocus />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'autofocus',
    })
  })

  it('renders range', () => {
    cy.mount(
      <TestDatePicker
        range
        value={[new Date(2020, 11, 23), new Date(2020, 11, 27)]}
      />
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'range',
    })
  })

  it('renders value parsed by custom value parser', () => {
    const parseInputValue = (value: string) => {
      return new Date(parseInt(value), 0, 1)
    }

    cy.mount(
      <TestDatePicker
        parseInputValue={parseInputValue}
        value={new Date(2020, 0, 1)}
        testIds={{
          input: 'date-picker-input',
        }}
      />
    )

    cy.getByTestId('date-picker-input').clear().type('2015')

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-value-parser',
    })
  })

  it('renders orange dot indicators in days between a date range', () => {
    const indicatedIntervals = [
      { start: new Date('2022-07-11'), end: new Date('2022-07-16') },
      { start: new Date('2022-07-18'), end: new Date('2022-07-23') },
    ]

    cy.mount(
      <TestDatePicker
        indicatedIntervals={indicatedIntervals}
        value={new Date('2022-07-14')}
        today={new Date('2022-07-26')}
        testIds={{
          input: 'date-picker-with-indicators',
        }}
      />
    )

    cy.getByTestId('date-picker-with-indicators').focus()

    cy.get('body').happoScreenshot({
      component,
      variant: 'indicated-intervals',
    })
  })

  it('renders a customized footer', () => {
    cy.mount(
      <TestDatePicker
        footer={
          <Typography size='small'>
            Got a question? <Link href='#'>Talk to us</Link>
          </Typography>
        }
        testIds={{
          input: 'date-picker-with-footer',
        }}
      />
    )

    cy.getByTestId('date-picker-with-footer').focus()

    cy.get('body').happoScreenshot({
      component,
      variant: 'customized-footer',
    })
  })
})
