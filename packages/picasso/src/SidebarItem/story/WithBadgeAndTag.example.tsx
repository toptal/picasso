import React from 'react'
import { Page, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import {
  Referrals16,
  Overview16,
  AddDocument16,
  Afternoon16,
  Award16,
  BankWire16,
  Bell16,
} from '@toptal/picasso/Icon'

const Menu = () => (
  <Page.Sidebar.Menu>
    <Page.Sidebar.Item icon={<Award16 />}>Overview</Page.Sidebar.Item>
    <Page.Sidebar.Item badge={5} icon={<BankWire16 />}>
      Jobs
    </Page.Sidebar.Item>
    <Page.Sidebar.Item tag='New' icon={<Afternoon16 />}>
      Team
    </Page.Sidebar.Item>
    <Page.Sidebar.Item badge={5} tag='New' icon={<Bell16 />}>
      Users
    </Page.Sidebar.Item>
    <Page.Sidebar.Item badge={5} tag='New' icon={<Bell16 />}>
      Users With Very Long Label
    </Page.Sidebar.Item>
    <Page.Sidebar.Item
      collapsible
      icon={<Referrals16 />}
      menu={
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item badge={5}>Referrals</Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      }
    >
      Referrals
    </Page.Sidebar.Item>
    <Page.Sidebar.Item
      collapsible
      icon={<Overview16 />}
      menu={
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item tag='New'>Share Online</Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      }
    >
      Share Online
    </Page.Sidebar.Item>
    <Page.Sidebar.Item
      collapsible
      icon={<AddDocument16 />}
      menu={
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item badge={5} tag='New'>
            Legal Info
          </Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      }
    >
      Legal Info
    </Page.Sidebar.Item>
  </Page.Sidebar.Menu>
)

const Example = () => (
  <Container flex gap={SPACING_4}>
    <Page.Sidebar size='large'>
      <Menu />
    </Page.Sidebar>
    <Page.Sidebar size='large' defaultCollapsed collapsible>
      <Menu />
    </Page.Sidebar>
  </Container>
)

export default Example
