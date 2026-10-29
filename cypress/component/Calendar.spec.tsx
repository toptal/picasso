import type { ComponentProps } from 'react'
import React from 'react'
import { Calendar, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso-utils'

import { FOCUS_RING, toHaveStyle, toMatchFocusVisible } from '../support/focus'

const TestCalendar = (props: ComponentProps<typeof Calendar>) => (
  <Calendar {...props} />
)

const component = 'Calendar'

describe('Calendar', () => {
  // cy.clock() fixes the time so that the screenshots
  // in happo are not affected by server timezone
  beforeEach(() => {
    cy.clock(new Date(2022, 4, 4).getTime())
  })

  describe('when no custom renderers provided', () => {
    it('renders default', () => {
      cy.mount(<TestCalendar onChange={noop} />)

      cy.get('body').happoScreenshot({
        component,
        variant: 'no-custom-renderer',
      })
    })
  })

  describe('when custom renderers are provided', () => {
    it('renders calendar with the custom layout', () => {
      cy.mount(
        <TestCalendar
          onChange={noop}
          renderMonthHeader={() => null}
          renderRoot={({ children }) => (
            <Container direction='column' padded={1.875} flex>
              {children}
            </Container>
          )}
          renderDay={({
            key,
            date,
            getDayFormatted,
            isMonthNext,
            isMonthPrev,
          }) => (
            <Container
              flex
              alignItems='center'
              justifyContent='center'
              style={{
                height: '3rem',
                minWidth: '6.821rem',
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
                verticalAlign: 'middle',
                fontSize: '0.875rem',
                userSelect: 'none',
                position: 'relative',
              }}
              key={key}
            >
              {isMonthNext || isMonthPrev ? '' : getDayFormatted(date)}
            </Container>
          )}
        />
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'no-custom-renderer/with-custom-layout',
      })
    })
  })
  describe('when dropdownNavigation is enabled', () => {
    it('renders the alternative navigation variant', () => {
      cy.mount(
        <TestCalendar
          onChange={noop}
          dropdownNavigation
          minDate={new Date('1990-01-01')}
          maxDate={new Date('2022-11-30')}
        />
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'dropdown-navigation',
      })
    })
  })

  describe('when focused', () => {
    // A frozen clock stalls the real keyboard and mouse events
    beforeEach(() => {
      cy.clock().invoke('restore')
    })

    it('shows focus ring on the calendar on keyboard focus', () => {
      cy.mount(
        <>
          <button>Before</button>
          <TestCalendar onChange={noop} data-testid='calendar' />
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('calendar')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })

    it('shows focus ring above the next day on keyboard focus of a selected day', () => {
      cy.mount(<TestCalendar onChange={noop} value={new Date(2022, 4, 10)} />)

      cy.getByTestId('day-button-9').realClick()
      cy.realPress('Tab')

      cy.getByTestId('day-button-10')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
        .and(toHaveStyle('zIndex', '1'))
    })

    it('shows focus ring on keyboard focus of a day inside a selected range', () => {
      cy.mount(
        <TestCalendar
          range
          onChange={noop}
          value={[new Date(2022, 4, 9), new Date(2022, 4, 13)]}
        />
      )

      cy.getByTestId('day-button-10').realClick()
      cy.realPress('Tab')

      cy.getByTestId('day-button-11')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })

    it('does not show focus ring on mouse focus of a selected day', () => {
      cy.mount(<TestCalendar onChange={noop} value={new Date(2022, 4, 10)} />)

      cy.getByTestId('day-button-10').realClick()

      cy.getByTestId('day-button-10')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })

    it('shows focus ring on the month select label on keyboard focus', () => {
      cy.mount(
        <>
          <button>Before</button>
          <TestCalendar
            onChange={noop}
            dropdownNavigation
            minDate={new Date('1990-01-01')}
            maxDate={new Date('2022-11-30')}
          />
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')
      cy.realPress('Tab')

      cy.get('select')
        .first()
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .parent('label')
        .should(toHaveStyle('boxShadow', FOCUS_RING))
    })
  })
})
