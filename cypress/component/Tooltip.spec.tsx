import React from 'react'
import { mount } from '@cypress/react'
import {
  Button,
  Container,
  Link,
  Tooltip,
  TooltipPlacementType
} from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TOOLTIP_PLACEMENTS: TooltipPlacementType[] = [
  'top-end',
  'top-start',
  'top',
  'right-end',
  'right-start',
  'right',
  'bottom-end',
  'bottom-start',
  'bottom',
  'left-end',
  'left-start',
  'left'
]

const TOOLTIP_LONG_TEXT = 'Content '.repeat(10)

const SnapshotTooltipExample = () => (
  <TestingPicasso>
    <Container padded='small'>
      <Section title='Default'>
        <Tooltip content='Content' open>
          <Button>Default</Button>
        </Tooltip>
        <Tooltip content='Content' open arrow={false}>
          <Button>Default without arrow</Button>
        </Tooltip>
        <Tooltip content='Content' open disablePortal>
          <Button>Default without portals</Button>
        </Tooltip>
      </Section>
      <Section title='Compact'>
        <Tooltip content='Content' open compact>
          <Button>Compact</Button>
        </Tooltip>
        <Tooltip content='Content' open compact arrow={false}>
          <Button>Compact without arrow</Button>
        </Tooltip>
      </Section>
      <Section title='Variant'>
        <Tooltip content='Content' open variant='light'>
          <Button>Light</Button>
        </Tooltip>
        <Tooltip content='Content' open variant='dark'>
          <Button>Dark</Button>
        </Tooltip>
      </Section>
      <Section title='Placement'>
        {TOOLTIP_PLACEMENTS.map(placement => (
          <Tooltip
            key={placement}
            content={placement}
            open
            placement={placement}
          >
            <Button>{placement}</Button>
          </Tooltip>
        ))}
      </Section>
      <Section title='Max width'>
        <Tooltip content={TOOLTIP_LONG_TEXT} open>
          <Button>Default</Button>
        </Tooltip>
        <Tooltip content={TOOLTIP_LONG_TEXT} open maxWidth='none'>
          <Button>None</Button>
        </Tooltip>
      </Section>
      <Section title='Prevent overflow'>
        <Tooltip content={TOOLTIP_LONG_TEXT} open placement='left'>
          <Button>Default</Button>
        </Tooltip>
        <Tooltip
          content={TOOLTIP_LONG_TEXT}
          open
          placement='left'
          preventOverflow={false}
        >
          <Button>Without overflow prevention</Button>
        </Tooltip>
      </Section>
      <Section title='Interactive'>
        <Tooltip content={<Link>Link</Link>} open interactive>
          <Button data-testid='tooltip-trigger'>Trigger</Button>
        </Tooltip>
      </Section>
    </Container>
  </TestingPicasso>
)

const LinkTooltipExample = () => {
  const content = (
    <Link href='#link' data-testid='tooltip-content'>
      Link
    </Link>
  )

  return (
    <TestingPicasso>
      <Tooltip content={content} interactive>
        <Button data-testid='tooltip-trigger'>Trigger</Button>
      </Tooltip>
    </TestingPicasso>
  )
}

describe('Tooltip', () => {
  it('renders correctly', () => {
    mount(<SnapshotTooltipExample />)

    cy.get('body').happoScreenshot()
  })

  it('renders interactive content', () => {
    mount(<LinkTooltipExample />)

    cy.get('[data-testid="tooltip-trigger"').click()
    cy.get('[data-testid="tooltip-content"').should('be.visible')

    cy.get('[data-testid="tooltip-content"').click()
    cy.url().should('include', '#link')
    cy.get('[data-testid="tooltip-content"').should('be.visible')

    cy.get('[data-testid="tooltip-trigger"').click()
    cy.get('[data-testid="tooltip-content"').should('not.be.visible')
  })
})
