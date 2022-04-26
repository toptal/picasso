import React, { ComponentProps } from 'react'
import { mount } from '@cypress/react'
import { Calendar, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestCalendar = (props: ComponentProps<typeof Calendar>) => (
  <TestingPicasso>
    <Calendar {...props} />
  </TestingPicasso>
)

describe('Calendar', () => {
  describe('when no custom renderers provided', () => {
    it('renders default', () => {
      mount(<TestCalendar onChange={() => undefined} />)

      cy.get('body').happoScreenshot()
    })
  })

  describe('when custom renderers are provided', () => {
    it('renders calendar with the new layout', () => {
      mount(
        <TestCalendar
          onChange={() => undefined}
          renderMonthHeader={() => null}
          customRender={({ children }) => (
            <Container direction='column' padded={1.875} flex>
              {children}
            </Container>
          )}
          renderDay={({
            key,
            date,
            getDayFormatted,
            isMonthNext,
            isMonthPrev
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
                position: 'relative'
              }}
              key={key}
            >
              {isMonthNext || isMonthPrev ? '' : getDayFormatted(date)}
            </Container>
          )}
        />
      )

      cy.get('body').happoScreenshot()
    })
  })
})
