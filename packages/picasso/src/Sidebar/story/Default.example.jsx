import React from 'react'
import { Sidebar, Label, Logo, Container, Typography } from '@toptal/picasso'
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
  <div
    style={{
      height: '58rem',
      maxHeight: '58rem',
      overflowY: 'scroll'
    }}
  >
    <Sidebar>
      <Sidebar.Logo>
        <Logo />
      </Sidebar.Logo>
      <Sidebar.Menu>
        <Sidebar.Item icon={<Overview16 />} selected>
          Overview
        </Sidebar.Item>
        <Sidebar.Item icon={<Jobs16 />}>Jobs</Sidebar.Item>
        <Sidebar.Item icon={<Candidates16 />}>Candidates</Sidebar.Item>
        <Sidebar.Item icon={<Team16 />}>Team</Sidebar.Item>
        <Sidebar.Item icon={<Participants16 />}>Users</Sidebar.Item>
        <Sidebar.Item icon={<Billing16 />} disabled>
          Billing
        </Sidebar.Item>
        <Sidebar.Item icon={<LegalInfo16 />}>
          <Typography size='medium' color='inherit'>
            Legal Info
          </Typography>
          <Container left='medium'>
            <Label>5</Label>
          </Container>
        </Sidebar.Item>
        <Sidebar.Item>
          Menu item with surprisingly long text content
        </Sidebar.Item>
        <Sidebar.Item
          collapsible
          icon={<Referrals16 />}
          menu={
            <Sidebar.Menu>
              <Sidebar.Item>Share Online</Sidebar.Item>
              <Sidebar.Item>Referred Users</Sidebar.Item>
              <Sidebar.Item>Commisions</Sidebar.Item>
              <Sidebar.Item>Payment Options</Sidebar.Item>
              <Sidebar.Item>Expected Commisions</Sidebar.Item>
            </Sidebar.Menu>
          }
        >
          Referrals
        </Sidebar.Item>
        <Sidebar.Item icon={<Resources16 />}>Resources</Sidebar.Item>
      </Sidebar.Menu>

      <Sidebar.Menu bottom>
        <Sidebar.Item icon={<Candidates16 />}>Opportunities</Sidebar.Item>
        <Sidebar.Item icon={<ReferralBonus16 />}>Referral Bonus</Sidebar.Item>
        <Sidebar.Item icon={<Help16 />}>Help</Sidebar.Item>
      </Sidebar.Menu>
    </Sidebar>
  </div>
)

export default Example
