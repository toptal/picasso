import React from 'react'
import { Page, Typography, Grid, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Overview16, Referrals16 } from '@toptal/picasso-icons'

const sidebarWithIcons = (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />}>Overview</Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item selected>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const sidebarWithoutIcons = (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item>Overview</Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item selected>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '24rem' }}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          With icons
        </Typography>
      </Container>
      {sidebarWithIcons}
    </Grid.Item>

    <Grid.Item style={{ height: '24rem' }}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Without icons
        </Typography>
      </Container>
      {sidebarWithoutIcons}
    </Grid.Item>
  </Grid>
)

export default Example
