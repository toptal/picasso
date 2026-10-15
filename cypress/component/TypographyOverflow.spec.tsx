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

const LinkExample = ({ onClick }: { onClick: () => void }) => (
  <Container padded='medium' style={{ width: 300, marginTop: 100 }}>
    <TypographyOverflow data-testid='ellipsed-text'>
      <a href='#' data-testid='link' onClick={onClick}>
        Link
      </a>{' '}
      inside a typography that is very long and therefore it overflows.
    </TypographyOverflow>
  </Container>
)

const SAFARI_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'

const mockDesktopSafari = () =>
  cy.window().then(win => {
    cy.stub(win.navigator, 'vendor').value('Apple Computer, Inc.')

    return cy.stub(win.navigator, 'userAgent').value(SAFARI_USER_AGENT)
  })

const getElementAtCenter = (element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect()

  return element.ownerDocument.elementFromPoint(
    left + width / 2,
    top + height / 2
  )
}

// The end of the line is plain text in every example
const getElementAtEnd = (element: HTMLElement) => {
  const { right, top, height } = element.getBoundingClientRect()

  return element.ownerDocument.elementFromPoint(right - 10, top + height / 2)
}

const expectOnTop = ([element]: JQuery<HTMLElement>) => {
  expect(getElementAtCenter(element)).to.equal(element)
}

const expectEmptyLayerOnTop = ([element]: JQuery<HTMLElement>) => {
  const hit = getElementAtEnd(element)

  expect(hit).to.have.attr('aria-hidden', 'true')
  expect(hit?.childNodes).to.have.length(0)
  expect(hit?.parentElement).to.equal(element)
}

// Hovering wraps the text in the tooltip anchor and remounts it, so hover first,
// as a user does before clicking
const hoverAndClickLink = () => {
  const onClick = cy.stub().as('linkClick')

  cy.mount(<LinkExample onClick={onClick} />)

  cy.getByTestId('ellipsed-text').realHover()
  cy.getByTestId('ellipsed-text').should(
    'have.attr',
    'data-picasso-tooltip-anchor'
  )
  cy.getByTestId('link').should(expectOnTop)
  cy.getByTestId('link').realClick()
  cy.get('@linkClick').should('have.been.calledOnce')
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

  it('renders no layer outside Safari', () => {
    cy.mount(<DefaultExample />)

    cy.getByTestId('ellipsed-text').should(expectOnTop)
    cy.getByTestId('ellipsed-text').find('[aria-hidden]').should('not.exist')
  })

  it('keeps a link inside clickable', () => {
    hoverAndClickLink()
  })

  describe('in desktop Safari', () => {
    beforeEach(() => {
      mockDesktopSafari()
    })

    it('puts an empty layer under the pointer and still opens the tooltip on hover', () => {
      cy.mount(<DefaultExample />)

      cy.getByTestId('ellipsed-text').should(expectEmptyLayerOnTop)

      cy.getByTestId('ellipsed-text').realHover()
      cy.getByRole('tooltip').should('be.visible')
    })

    it('keeps the layer over the text next to a link and the link clickable', () => {
      cy.mount(<LinkExample onClick={cy.stub()} />)

      cy.getByTestId('ellipsed-text').should(expectEmptyLayerOnTop)
      cy.getByTestId('link').should(expectOnTop)

      hoverAndClickLink()
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
