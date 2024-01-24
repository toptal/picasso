import type { DatePickerProps, DatePickerValue } from '@toptal/picasso'
import {
  Container,
  DatePicker,
  Link,
  Typography,
  Button,
  Drawer,
} from '@toptal/picasso'
import { PicassoBreakpoints } from '@toptal/picasso-provider'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'
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

    cy.getByTestId('date-picker-input').clear()
    cy.getByTestId('date-picker-input').type('2015')

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-value-parser',
    })
  })

  it('renders orange dot indicators in days between a date range', () => {
    const indicatedIntervals = [
      { start: new Date('2021-07-11'), end: new Date('2021-07-16') },
      { start: new Date('2021-07-18'), end: new Date('2021-07-23') },
    ]

    cy.mount(
      <TestDatePicker
        indicatedIntervals={indicatedIntervals}
        value={new Date('2021-07-14')}
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

  const TestAsyncExternalUpdateDatePicker = () => {
    const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>(
      new Date(2020, 7, 21)
    )
    const [disabled, setDisabled] = useState(false)

    const handleChange = (value: any) => {
      setDisabled(true)
      setTimeout(() => {
        setDatepickerValue(value)
        setDisabled(false)
      }, 100)
    }

    return (
      <Container padded='medium' flex>
        <Button
          data-testid='reset-button'
          onClick={() => {
            setDisabled(true)
            setTimeout(() => {
              setDatepickerValue(null)
              setDisabled(false)
            }, 100)
          }}
        >
          Reset
        </Button>
        <DatePicker
          testIds={{
            input: 'date-picker-input',
          }}
          value={datepickerValue}
          enableReset
          disabled={disabled}
          onResetClick={() => setDatepickerValue(null)}
          onChange={handleChange}
        />
      </Container>
    )
  }

  it('reacts to external value updates correctly', () => {
    cy.mount(<TestAsyncExternalUpdateDatePicker />)

    cy.getByTestId('date-picker-input').focus()
    cy.getByTestId('day-button-15').click()
    cy.getByTestId('date-picker-input').should('have.value', 'Aug 15, 2020')
    cy.getByTestId('reset-button').click()

    cy.getByTestId('date-picker-input').should('have.value', '')
  })

  it('works inside drawer', () => {
    const DATEPICKER_INPUT_TESTID = 'datepicker-input'

    const DrawerExample = () => {
      const [val, setVal] = useState<Date>()

      return (
        <Drawer open>
          <div style={{ height: '50vh' }}>
            <DatePicker
              testIds={{
                input: DATEPICKER_INPUT_TESTID,
              }}
              value={val}
              onChange={date => {
                setVal(date as Date)
              }}
            />
          </div>
        </Drawer>
      )
    }

    cy.mount(<DrawerExample />)

    cy.getByTestId(DATEPICKER_INPUT_TESTID).as('input').click()
    cy.getByTestId('day-button-15').click()

    cy.get('@input')
      .should('have.attr', 'value')
      .and('match', /\d{1,2}-15-\d{4}/)

    cy.get('body').happoScreenshot()
  })

  describe('when number of displayed months is more than one', () => {
    Cypress._.each(HAPPO_TARGETS, happoTarget => {
      const { width } = happoTarget

      describe(`when screen has ${width}px width`, () => {
        const isNarrowScreen = width < PicassoBreakpoints.breakpoints.values.md

        it(
          isNarrowScreen ? 'displays one month' : 'displays two months',
          () => {
            cy.viewport(width, 1000)

            cy.mount(
              <TestDatePicker
                numberOfMonths={2}
                testIds={{
                  input: 'date-picker-input',
                  calendar: 'date-picker-calendar',
                }}
              />
            )

            cy.getByTestId('date-picker-input').focus()
            cy.get('.rdp-month').should('have.length', isNarrowScreen ? 1 : 2)

            cy.get('body').happoScreenshot({
              component,
              variant: `date-picker/${width}-default`,
              targets: [happoTarget],
            })
          }
        )
      })
    })
  })
})
