import React from 'react'
import { Sidebar, Typography, Grid } from '@toptal/picasso'
import {
  Jobs16,
  Overview16,
  Candidates16,
  Team16,
  Participants16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  ReferralBonus16,
  Help16
} from '@toptal/picasso/Icon'

const Example = () => (
  <Grid spacing={32}>
    <Grid.Item style={{ height: '58rem' }}>
      <Typography variant='heading' size='small'>
        With icons
      </Typography>
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item icon={<Overview16 />}>Overview</Sidebar.Item>
          <Sidebar.Item icon={<Jobs16 />}>Jobs</Sidebar.Item>
          <Sidebar.Item icon={<Candidates16 />}>Candidates</Sidebar.Item>
          <Sidebar.Item icon={<Team16 />}>Team</Sidebar.Item>
          <Sidebar.Item icon={<Participants16 />}>Users</Sidebar.Item>
          <Sidebar.Item icon={<Billing16 />} disabled>
            Billing
          </Sidebar.Item>
          <Sidebar.Item icon={<LegalInfo16 />}>Legal Info</Sidebar.Item>
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
          <Sidebar.Item icon={<Resources16 />}>
            Menu item with surprisingly long text content
          </Sidebar.Item>
        </Sidebar.Menu>

        <Sidebar.Menu bottom>
          <Sidebar.Item icon={<Candidates16 />}>Opportunities</Sidebar.Item>
          <Sidebar.Item icon={<ReferralBonus16 />}>Referral Bonus</Sidebar.Item>
          <Sidebar.Item icon={<Help16 />}>Help</Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </Grid.Item>

    <Grid.Item style={{ height: '58rem' }}>
      <Typography variant='heading' size='small'>
        Without icons
      </Typography>
      <Sidebar>
        <Sidebar.Menu>
          <Sidebar.Item>Overview</Sidebar.Item>
          <Sidebar.Item>Jobs</Sidebar.Item>
          <Sidebar.Item>Candidates</Sidebar.Item>
          <Sidebar.Item>Team</Sidebar.Item>
          <Sidebar.Item>Users</Sidebar.Item>
          <Sidebar.Item disabled>Billing</Sidebar.Item>
          <Sidebar.Item>
            <Typography size='medium' color='inherit'>
              Legal Info
            </Typography>
          </Sidebar.Item>
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
          <Sidebar.Item>
            Menu item with surprisingly long text content
          </Sidebar.Item>
        </Sidebar.Menu>

        <Sidebar.Menu bottom>
          <Sidebar.Item>Opportunities</Sidebar.Item>
          <Sidebar.Item>Referral Bonus</Sidebar.Item>
          <Sidebar.Item>Help</Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </Grid.Item>
  </Grid>
)

export default Example
