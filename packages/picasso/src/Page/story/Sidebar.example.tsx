import React, { useState } from 'react'
import { Page, Container, Menu, Typography } from '@toptal/picasso'
import {
  Globe16,
  Profile16,
  PortfolioDesigner16,
  Referral16
} from '@toptal/picasso/Icon'
import { noop } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const SidebarMenu = () => {
  const [[selectedItem, selectedSubItem], setSelectedItems] = useState<
    [string?, string?]
  >(['home'])

  const item = (id: string, subItemId?: string) => ({
    onClick: () => setSelectedItems([id, subItemId]),
    selected:
      selectedItem === id && (!subItemId || subItemId === selectedSubItem)
  })

  const subMenu = (
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item {...item('ref', 'active')} badge={{ content: 2 }}>
        Active
      </Page.Sidebar.Item>
      <Page.Sidebar.Item {...item('ref', 'history')}>History</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  )

  return (
    <Page.Sidebar collapsible>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item {...item('home')} icon={<PortfolioDesigner16 />}>
          Home
        </Page.Sidebar.Item>
        <Page.Sidebar.Item {...item('contact')} icon={<Profile16 />}>
          Contacts
        </Page.Sidebar.Item>
        <Page.Sidebar.Item {...item('team')} icon={<Globe16 />}>
          Team
        </Page.Sidebar.Item>
        <Page.Sidebar.Item
          collapsible
          badge={{ content: 2 }}
          menu={subMenu}
          {...item('ref')}
          onClick={noop}
          icon={<Referral16 />}
        >
          Referrals
        </Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  )
}

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
  <Container top='small' bottom='small'>
    <Container bottom='small'>
      <Typography align='center' variant='heading' size='large'>
        Default example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
