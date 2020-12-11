import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Sidebar } from '@toptal/picasso'
import { Overview16 } from '@toptal/picasso/Icon'

const SidebarDefaultExample = () => (
  <BrowserRouter>
    <Sidebar>
      <Sidebar.Menu>
        <Sidebar.Item icon={<Overview16 />} as={Link} to='/#overview' selected>
          Overview
        </Sidebar.Item>
      </Sidebar.Menu>
    </Sidebar>
  </BrowserRouter>
)

export default SidebarDefaultExample
