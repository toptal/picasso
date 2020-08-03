import React, { useState, ReactNode } from 'react'
import {
  Container,
  Sidebar,
  PortfolioDesigner16,
  Profile16,
  Globe16,
  Page,
  Menu,
  Typography,
  Update16
} from '@toptal/picasso'
import { SkeletonLoader } from '@toptal/picasso-lab'

const useGetData = (): [boolean, () => void] => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    setTimeout(() => setLoading(false), 2000)
  }

  const reload = () => {
    setLoading(true)
  }

  return [loading, reload]
}

const SidebarMenu = ({ children }: { children: ReactNode }) => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Sidebar.Item>
      <Sidebar.Item icon={<Profile16 />}>Contacts</Sidebar.Item>
      <Sidebar.Item icon={<Globe16 />}>Team</Sidebar.Item>
    </Sidebar.Menu>
    <Sidebar.Menu bottom>{children}</Sidebar.Menu>
  </Sidebar>
)

const RightContent = () => (
  <Page.HeaderMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item>My Account</Menu.Item>
      <Menu.Item>Log Out</Menu.Item>
    </Menu>
  </Page.HeaderMenu>
)

const Content = () => (
  <>
    <Typography align='center' variant='heading' size='large'>
      Default example
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

    <Typography align='center' variant='heading' size='large'>
      Default example
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
  </>
)

const PageLoader = () => (
  <>
    <SkeletonLoader.Header centered />
    <SkeletonLoader.Typography rows={4} />
    <SkeletonLoader.Header centered />
    <SkeletonLoader.Typography rows={4} />
  </>
)

const PageExample = () => {
  const [loading, reloadData] = useGetData()

  return (
    <div style={{ height: '40rem' }}>
      <Page>
        <Page.Header rightContent={<RightContent />} title='Default example' />
        <Page.Content>
          <SidebarMenu>
            <Sidebar.Item icon={<Update16 />} onClick={reloadData}>
              Click me to reload the content!
            </Sidebar.Item>
          </SidebarMenu>
          <Container
            style={{ flex: 1 }}
            top='small'
            bottom='small'
            left='small'
            right='small'
          >
            {loading ? PageLoader() : <Content />}
          </Container>
        </Page.Content>
        <Page.Footer />
      </Page>
    </div>
  )
}

export default PageExample
