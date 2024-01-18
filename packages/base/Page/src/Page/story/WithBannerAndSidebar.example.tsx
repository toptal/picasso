import React from 'react'
import {
  Page,
  Container,
  Menu,
  Typography,
  Overview16,
  Jobs16,
  Candidates16,
  Billing16,
  LegalInfo16,
  Participants16,
  Referrals16,
  Resources16,
  Team16,
  ReferralBonus16,
  Help16,
  Logo,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const containerHeight = '30rem'

const Example = () => (
  <div style={{ height: containerHeight, overflowY: 'scroll' }}>
    <Page hamburgerId='banner-and-sidebar-example'>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
      <Page.Banner>
        We are now in the process of reviewing your profile. After your profile
        has been checked, we will reach to you via email about next steps.
      </Page.Banner>
      <Page.Content>
        <Sidebar />
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
      <Typography align='center' variant='heading' size='large'>
        Banner example
      </Typography>
    </Container>
    <Paragraph />
    <Paragraph />
    <Paragraph />
    <Paragraph />
    <Paragraph />
  </Container>
)

const Paragraph = () => (
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci
    phasellus egestas tellus rutrum tellus pellentesque eu. Elementum facilisis
    leo vel fringilla est ullamcorper eget nulla. Massa id neque aliquam
    vestibulum. Lorem donec massa sapien faucibus et molestie ac feugiat sed. In
    aliquam sem fringilla ut morbi tincidunt augue interdum velit. Erat velit
    scelerisque in dictum non. Eros donec ac odio tempor orci dapibus. Ac tortor
    vitae purus faucibus ornare suspendisse. Amet commodo nulla facilisi nullam
    vehicula. Lacus vel facilisis volutpat est velit egestas dui id. Tortor
    dignissim convallis aenean et tortor at risus. Mauris in aliquam sem
    fringilla ut morbi tincidunt augue interdum. Nisl suscipit adipiscing
    bibendum est ultricies integer.
  </Typography>
)

const Sidebar = () => (
  <Page.Sidebar
    collapsible
    wrapperMaxHeight={`calc(${containerHeight} - 3.5rem)`}
  >
    <Page.Sidebar.Logo collapsedLogo={<Logo emblem />} fullLogo={<Logo />} />
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
)

export default Example
