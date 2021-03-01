import React from 'react'
import { mount } from '@cypress/react'
import {
  Button,
  Container,
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

const TooltipExample = () => (
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
    </Container>
  </TestingPicasso>
)

describe('Tooltip', () => {
  it('renders correctly', () => {
    mount(<TooltipExample />)

    cy.get('body').happoScreenshot()
  })
})
