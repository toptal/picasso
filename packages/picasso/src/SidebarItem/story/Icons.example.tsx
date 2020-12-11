import React from 'react'
import { Sidebar, Typography, Grid, Container } from '@toptal/picasso'
import { Overview16, Referrals16 } from '@toptal/picasso/Icon'

const sidebarWithIcons = (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<Overview16 />}>Overview</Sidebar.Item>
      <Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Sidebar.Menu>
            <Sidebar.Item selected>Share Online</Sidebar.Item>
            <Sidebar.Item>Referred Users</Sidebar.Item>
            <Sidebar.Item>Commissions</Sidebar.Item>
            <Sidebar.Item>Payment Options</Sidebar.Item>
            <Sidebar.Item>Expected Commissions</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Referrals
      </Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

const sidebarWithoutIcons = (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item>Overview</Sidebar.Item>
      <Sidebar.Item
        collapsible
        menu={
          <Sidebar.Menu>
            <Sidebar.Item selected>Share Online</Sidebar.Item>
            <Sidebar.Item>Referred Users</Sidebar.Item>
            <Sidebar.Item>Commissions</Sidebar.Item>
            <Sidebar.Item>Payment Options</Sidebar.Item>
            <Sidebar.Item>Expected Commissions</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Referrals
      </Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '24rem' }}>
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          With icons
        </Typography>
      </Container>
      {sidebarWithIcons}
    </Grid.Item>

    <Grid.Item style={{ height: '24rem' }}>
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          Without icons
        </Typography>
      </Container>
      {sidebarWithoutIcons}
    </Grid.Item>
  </Grid>
)

export default Example
