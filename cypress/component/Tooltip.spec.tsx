import React from 'react'
import { mount } from '@cypress/react'
import {
  Button,
  Container,
  Tooltip,
  TooltipProps,
  TooltipPlacementType,
  Typography
} from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const ScreenshotTooltipExample = () => {
  const placements: TooltipPlacementType[] = [
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

  return (
    <TestingPicasso>
      <Container padded='small'>
        <Section title='Default'>
          <Tooltip content='Content' open>
            <Button>Default</Button>
          </Tooltip>
          <Tooltip content='Content' open arrow={false}>
            <Button>Default without arrow</Button>
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
          {placements.map(placement => (
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
          <Tooltip content={'Content '.repeat(10)} open maxWidth='none'>
            <Button>None</Button>
          </Tooltip>
          <Tooltip content={'Content '.repeat(10)} open maxWidth='default'>
            <Button>Default</Button>
          </Tooltip>
        </Section>
      </Container>
    </TestingPicasso>
  )
}

const BehaviourTooltipExample = (props?: Partial<TooltipProps>) => (
  <TestingPicasso>
    <Tooltip
      {...props}
      content={<Typography data-testid='content'>Content</Typography>}
    >
      <Button data-testid='trigger'>Trigger</Button>
    </Tooltip>
  </TestingPicasso>
)

describe('Tooltip', () => {
  it('renders correctly', () => {
    mount(<ScreenshotTooltipExample />)

    cy.get('body').happoScreenshot()
  })

  it('opens and closes by mouse navigation', () => {
    mount(<BehaviourTooltipExample />)
    cy.get('[data-testid=trigger]').trigger('mouseover')
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=trigger]').trigger('mouseout')
    cy.get('[data-testid=content]').should('not.be.visible')
  })

  it('opens and closes by keyboard navigation', () => {
    mount(<BehaviourTooltipExample />)
    cy.get('[data-testid=trigger]').focus()
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=trigger]').blur()
    cy.get('[data-testid=content]').should('not.be.visible')
  })

  it('does not close when content is interacted with', () => {
    mount(<BehaviourTooltipExample interactive />)
    cy.get('[data-testid=trigger]').trigger('mouseover')
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=content]').trigger('mouseover')
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=content]').trigger('mouseout')
    cy.get('[data-testid=content]').should('not.be.visible')
  })
})
