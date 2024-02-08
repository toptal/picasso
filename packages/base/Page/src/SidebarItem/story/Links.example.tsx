import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Page } from '@toptal/picasso'
import { Overview16 } from '@toptal/picasso-icons'

const SidebarDefaultExample = () => (
  <BrowserRouter>
    <Page.Sidebar>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item
          icon={<Overview16 />}
          as={Link}
          to='/#overview'
          selected
        >
          Overview
        </Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  </BrowserRouter>
)

export default SidebarDefaultExample
