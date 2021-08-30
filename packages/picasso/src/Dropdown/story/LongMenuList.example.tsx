import React from 'react'
import { Dropdown, Menu, Grid } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

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
    {menuItems.map((itemName, index) => (
      <Menu.Item onClick={handleClick} key={`${itemName}${String(index)}`}>
        {itemName}
      </Menu.Item>
    ))}
  </Menu>
)

const Example = () => (
  <Grid direction='row'>
    <Grid.Item>
      <Dropdown contentOverflow='scroll' content={menu}>
        Display the menu with a scrollbar
        <Dropdown.Arrow />
      </Dropdown>
    </Grid.Item>
    <Grid.Item>
      <Dropdown contentOverflow='visible' content={menu}>
        Display the menu without a scrollbar
        <Dropdown.Arrow />
      </Dropdown>
    </Grid.Item>
  </Grid>
)

export default Example
