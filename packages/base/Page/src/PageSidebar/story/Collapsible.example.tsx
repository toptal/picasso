import React from 'react'
import { Page, Logo, Typography } from '@toptal/picasso'
import {
  Jobs16,
  Home16,
  Candidates16,
  Team16,
  Billing16,
  LegalInfo16,
  Referrals16,
  Resources16,
  ReferralBonus16,
  Help16,
  Participants16,
} from '@toptal/picasso-icons'

const Example = () => {
  const handleCollapse = () => {
    window.alert('Sidebar onCollapse called')
  }

  return (
    <div
      style={{
        height: '58rem',
        maxHeight: '58rem',
        overflowY: 'scroll',
      }}
    >
      <Page.Sidebar collapsible onCollapse={handleCollapse}>
        <Page.Sidebar.Logo
          collapsedLogo={<Logo emblem />}
          fullLogo={<Logo />}
        />
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item icon={<Home16 />} selected>
            Overview
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Candidates16 />}>
            Candidates
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Billing16 />} disabled>
            Billing
          </Page.Sidebar.Item>
          <Page.Sidebar.Item
            badge={{ content: 5 }}
            icon={<LegalInfo16 />}
            menu={
              <Page.Sidebar.Menu>
                <Page.Sidebar.Item>Terms and Conditions</Page.Sidebar.Item>
                <Page.Sidebar.Item>Support</Page.Sidebar.Item>
              </Page.Sidebar.Menu>
            }
          >
            <Typography size='medium' color='inherit'>
              Legal Info
            </Typography>
          </Page.Sidebar.Item>
          <Page.Sidebar.Item
            collapsible
            badge={{ content: 10 }}
            icon={<Referrals16 />}
            menu={
              <Page.Sidebar.Menu>
                <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
                <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
                <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
                <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
                <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
              </Page.Sidebar.Menu>
            }
          >
            Referrals
          </Page.Sidebar.Item>
          <Page.Sidebar.Item badge={{ content: 10 }} icon={<Resources16 />}>
            Menu item with surprisingly long text content
          </Page.Sidebar.Item>
        </Page.Sidebar.Menu>

        <Page.Sidebar.Menu bottom>
          <Page.Sidebar.Item icon={<Candidates16 />}>
            Opportunities
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<ReferralBonus16 />}>
            Referral Bonus
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Help16 />}>Help</Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      </Page.Sidebar>
    </div>
  )
}

export default Example
