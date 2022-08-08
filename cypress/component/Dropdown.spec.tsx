import React from 'react'
import {
  Dropdown,
  Menu,
  Button,
  Grid,
  Container,
  Typography,
  Form,
  Input,
} from '@toptal/picasso'

const LongListExample = () => (
  <Container padded='medium' style={{ height: 900 }}>
    <Grid direction='row'>
      <Grid.Item>
        <Dropdown content={menu}>
          Display the menu with a scrollbar
          <Dropdown.Arrow data-testid='content-overflow-scroll' />
        </Dropdown>
      </Grid.Item>
      <Grid.Item>
        <Dropdown contentOverflow='visible' content={menu}>
          Display the menu without a scrollbar
          <Dropdown.Arrow data-testid='content-overflow-visible' />
        </Dropdown>
      </Grid.Item>
    </Grid>
  </Container>
)

const CustomContentExample = () => (
  <Container padded='medium'>
    <Dropdown content={<ComplexContent />} disableAutoClose disablePortal>
      <Button data-testid='trigger'>Open dropdown</Button>
    </Dropdown>
  </Container>
)

const CustomContentStyleExample = () => (
  <Container padded='medium'>
    <Dropdown
      content={<div>custom content height</div>}
      contentStyle={{
        height: '25rem',
        maxHeight: '25rem',
      }}
    >
      <Button data-testid='trigger'>Open dropdown</Button>
    </Dropdown>
  </Container>
)

const ComplexContent = () => {
  return (
    <Container padded='medium'>
      <Container bottom='small'>
        <Typography variant='heading' size='medium'>
          Talent
        </Typography>
      </Container>
      <Form>
        <Form.Field>
          <Input autoFocus width='full' placeholder='Job title' />
        </Form.Field>
      </Form>
    </Container>
  )
}

const component = 'Dropdown'

describe('Dropdown', () => {
  it('renders with long list', () => {
    cy.mount(<LongListExample />)

    cy.getByTestId('content-overflow-scroll').click()

    // scroll to bottom of menu
    cy.getByTestId('menu').parent().scrollTo('bottom')

    cy.get('body').happoScreenshot({
      component,
      variant: 'long-list/after-clicked-with-scroll',
    })

    cy.getByTestId('content-overflow-visible').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'long-list/after-clicked-without-scroll',
    })
  })

  it('renders with custom content', () => {
    cy.mount(<CustomContentExample />)

    cy.getByTestId('trigger').realClick()
    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-content/after-clicked',
    })
  })

  it('renders with custom content style', () => {
    cy.mount(<CustomContentStyleExample />)

    cy.getByTestId('trigger').realClick()

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-content-style/after-clicked',
    })
  })
})

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
  'Apply to Different Vertical',
]

const menu = (
  <Menu data-testid='menu'>
    {menuItems.map(itemName => (
      <Menu.Item onClick={() => {}} key={itemName}>
        {itemName}
      </Menu.Item>
    ))}
  </Menu>
)
