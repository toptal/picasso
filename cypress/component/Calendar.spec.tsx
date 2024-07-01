import type { ComponentProps } from 'react'
import React from 'react'
import { Calendar, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso-utils'

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
})
