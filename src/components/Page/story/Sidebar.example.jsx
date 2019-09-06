import React, { useContext } from 'react'
import {
  Sidebar,
  Page,
  Container,
  Menu,
  Typography,
  Label,
  Logo
} from '@toptal/picasso'
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
import { PageContext } from '@toptal/picasso/Page'
import { useScreenSize, isScreenSize } from '@toptal/picasso/utils'
import { Popover } from '@material-ui/core'

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
      FullWidth example
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

const PageSidebar = () => {
  const { showSidebar, triggerEl, onSidebarToggle } = useContext(PageContext)
  const windowSize = useScreenSize()
  const isMobile = isScreenSize('small', windowSize)

  console.log('dddd: ', triggerEl)

  const sidebar = (
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
  )

  if (isMobile) {
    return (
      <Popover
        open={showSidebar}
        onClose={onSidebarToggle}
        anchorEl={triggerEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {sidebar}
      </Popover>
    )
  }

  return (
    <div
      style={{
        height: '100%'
      }}
    >
      {sidebar}
    </div>
  )
}

export default PageSidebarExample
