import type { PropsWithChildren } from 'react'
import React from 'react'
import {
  Checkbox,
  Container,
  Typography,
  TypographyOverflow,
} from '@toptal/picasso'

const DynamicWidthContainer = ({ children }: PropsWithChildren<{}>) => (
  <Container
    style={{
      marginTop: '1rem',
      width: 500,
      paddingRight: 20,
      resize: 'horizontal',
      overflow: 'auto',
      borderRight: '3px solid black',
    }}
  >
    {children}
  </Container>
)

const DefaultExample = () => (
  <Container padded='medium'>
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow data-testid='ellipsed-text'>
        This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
    <DynamicWidthContainer>
      <TypographyOverflow data-testid='ellipsed-text-dynamic-width'>
        Another typography is very long and has dynamic width. Try to resize.
      </TypographyOverflow>
    </DynamicWidthContainer>
  </Container>
)

const CheckboxLabelExample = () => (
  <Container
    flex
    padded='medium'
    style={{ marginTop: 100, maxWidth: '150px', flexBasis: '150px' }}
  >
    <Checkbox
      label={
        <TypographyOverflow data-testid='ellipsed-text'>
          This typography is very long and therefore it overflows.
        </TypographyOverflow>
      }
    />
  </Container>
)

const CustomTooltipAndDelayExample = () => (
  <Container padded='medium' style={{ width: 300, marginTop: 100 }}>
    <TypographyOverflow
      data-testid='custom-tooltip-ellipsed-text'
      tooltipContent={
        <Typography color='yellow' weight='semibold'>
          This typography is very long and therefore it overflows.
        </Typography>
      }
    >
      This typography is very long and therefore it overflows.
    </TypographyOverflow>

    <div style={{ marginTop: 100 }}>
      <TypographyOverflow
        tooltipDelay='long'
        data-testid='long-delay-ellipsed-text'
      >
        Long delay. This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
  </Container>
)

const LinkExample = () => (
  <Container padded='medium' style={{ width: 300, marginTop: 100 }}>
    <TypographyOverflow disableTooltipGuard>
      <a href='#' data-testid='link'>
        Link
      </a>{' '}
      inside a typography that is very long and therefore it overflows.
    </TypographyOverflow>
  </Container>
)

const getElementAtCenter = (element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect()

  return element.ownerDocument.elementFromPoint(
    left + width / 2,
    top + height / 2
  )
}

const component = 'TypographyOverflow'

describe('TypographyOverflow', () => {
  it('renders', () => {
    cy.mount(<DefaultExample />)

    cy.getByTestId('ellipsed-text').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-hovered-static-width',
    })

    cy.get('body').click(0, 0)
    cy.getByRole('tooltip').should('not.exist')

    cy.getByTestId('ellipsed-text-dynamic-width').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-hovered-dynamic-width',
    })
  })

  it('puts an empty layer under the pointer and still opens the tooltip on hover', () => {
    cy.mount(<DefaultExample />)

    cy.getByTestId('ellipsed-text').should(([element]) => {
      const hit = getElementAtCenter(element)

      expect(hit).to.have.attr('aria-hidden', 'true')
      expect(hit?.childNodes).to.have.length(0)
      expect(hit?.parentElement).to.equal(element)
    })

    cy.getByTestId('ellipsed-text').realHover()
    cy.getByRole('tooltip').should('be.visible')
  })

  it('leaves a link reachable when disableTooltipGuard is set', () => {
    cy.mount(<LinkExample />)

    cy.getByTestId('link').should(([link]) => {
      expect(getElementAtCenter(link)).to.equal(link)
    })
  })

  it('renders with Checkbox label', () => {
    cy.mount(<CheckboxLabelExample />)

    cy.getByTestId('ellipsed-text').click()
    // blur before screenshot so the synthetic-event focus ring doesn't leak into the capture
    cy.focused().blur()
    cy.get('body').happoScreenshot({
      component,
      variant: 'checkbox-label/after-hovered',
    })
  })

  it('renders with custom tooltip', () => {
    cy.mount(<CustomTooltipAndDelayExample />)

    cy.getByTestId('custom-tooltip-ellipsed-text').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-tooltip/after-hovered',
    })

    cy.getByTestId('long-delay-ellipsed-text').click()
    cy.getByRole('tooltip')
      .contains(
        'Long delay. This typography is very long and therefore it overflows.'
      )
      .should('be.visible')
  })
})
