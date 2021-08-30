import React from 'react'
import { Dropdown, Menu, Button, Grid } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { mount } from '@cypress/react'

const menuItems = [
  'Add Infraction',
  'Convert to Sourcing Flow',
  'Reject Application',
  'Pause Application',
  'Reset Application',
  'Edit Details',
  'Talent Profile',
  'Communication',
  'Request Availability',
  'Referred Users',
  'Deactivate Talent',
  'Restore Talent',
  'Convert to...',
  'Talent Health Status',
  'Import Contract',
  'Workflows',
  'Hold Payments',
  'Remove Hold on Payments',
  'Payments',
  'Payment History',
  'Download IP History',
  'GDPR Report',
  'GDPR Remove Data',
  'Login as this Talent',
  'Apply to Different Vertical'
]

const menu = (
  <Menu>
    {menuItems.map(itemName => (
      <Menu.Item onClick={() => {}} key={itemName}>
        {itemName}
      </Menu.Item>
    ))}
  </Menu>
)

const DropdownExample = () => (
  <Grid direction='row'>
    <Grid.Item>
      <Dropdown content={menu}>
        <Button data-testid='content-overflow-scroll'>
          Display the menu with a scrollbar
        </Button>
      </Dropdown>
    </Grid.Item>
    <Grid.Item>
      <Dropdown contentOverflow='visible' content={menu}>
        <Button data-testid='content-overflow-visible'>
          Display the menu without a scrollbar
        </Button>
      </Dropdown>
    </Grid.Item>
  </Grid>
)

describe('Dropdown', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <DropdownExample />
      </TestingPicasso>
    )
    cy.get('[data-testid="content-overflow-scroll"]').click()
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="content-overflow-visible"]').click()
    cy.get('body').happoScreenshot()
  })
})
