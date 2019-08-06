import React from 'react'
import { Sidebar } from '@toptal/picasso'
import { Jobs16, Overview16, Candidates16 } from '@toptal/picasso/Icon'

const SidebarDefaultExample = () => (
  <div
    style={{
      height: '51.75em'
    }}
  >
    <Sidebar>
      <Sidebar.Menu>
        <Sidebar.Item icon={<Overview16 />} selected>
          Overview
        </Sidebar.Item>
        <Sidebar.Item icon={<Jobs16 />} disabled>
          Jobs
        </Sidebar.Item>
        <Sidebar.Item
          icon={<Candidates16 />}
          menu={
            <Sidebar.Menu>
              <Sidebar.Item>First 7</Sidebar.Item>
              <Sidebar.Item>Second 8</Sidebar.Item>
              <Sidebar.Item>Third 9</Sidebar.Item>
            </Sidebar.Menu>
          }
        >
          Candidates
        </Sidebar.Item>
      </Sidebar.Menu>

      <Sidebar.Menu bottom>
        <Sidebar.Item>First 4</Sidebar.Item>
        <Sidebar.Item>Second 5</Sidebar.Item>
        <Sidebar.Item>Third 6</Sidebar.Item>
      </Sidebar.Menu>

      <Sidebar.Menu bottom>
        <Sidebar.Item icon={<Overview16 />}>Overview</Sidebar.Item>
        <Sidebar.Item icon={<Jobs16 />}>Jobs</Sidebar.Item>
        <Sidebar.Item
          icon={<Candidates16 />}
          menu={
            <Sidebar.Menu>
              <Sidebar.Item>First 7</Sidebar.Item>
              <Sidebar.Item>Second 8</Sidebar.Item>
              <Sidebar.Item>Third 9</Sidebar.Item>
            </Sidebar.Menu>
          }
        >
          Candidates
        </Sidebar.Item>
      </Sidebar.Menu>
    </Sidebar>
  </div>
)

export default SidebarDefaultExample
