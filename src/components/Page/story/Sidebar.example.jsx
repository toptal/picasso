import React from 'react'
import { Page, Container, Menu, Typography, Label, Logo } from '@toptal/picasso'
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

const PageSidebarExample = () => (
  <div style={{ height: '40rem', overflowY: 'scroll' }}>
    <Page fullWidth>
      <Page.Header rightContent={<RightContent />} title='Sidebar example' />
      <Page.Content>
        <Container flex>
          <PageSidebar />
          <Content />
        </Container>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.HeaderMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.HeaderMenu>
)

const Content = () => (
  <Container top='small' bottom='small' left='small' right='small'>
    <Typography align='center' variant='heading' size='large'>
      Sidebar example
    </Typography>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Container>
)

const PageSidebar = () => (
  <Page.Sidebar>
    <Page.Sidebar.Logo>
      <Logo />
    </Page.Sidebar.Logo>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />} selected>
        Overview
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Candidates16 />}>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Participants16 />}>Users</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Billing16 />} disabled>
        Billing
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<LegalInfo16 />}>
        <Typography size='medium' color='inherit'>
          Legal Info
        </Typography>
        <Container left='medium'>
          <Label>5</Label>
        </Container>
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commisions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commisions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Resources16 />}>Resources</Page.Sidebar.Item>
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
)

export default PageSidebarExample
