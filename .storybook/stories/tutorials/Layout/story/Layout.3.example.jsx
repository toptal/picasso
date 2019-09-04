import React from 'react'
import styled from 'styled-components'
import { Page, Grid, Container, Typography } from '@toptal/picasso'
import {
  Globe16,
  Profile16,
  PortfolioDesigner16,
  Message16
} from '@toptal/picasso/Icon'

const SidebarItem = ({ icon, children }) => (
  <Container padded='xsmall'>
    <Grid spacing={8} alignItems='center'>
      <Grid.Item>{icon}</Grid.Item>
      <Grid.Item>
        <Typography weight='semibold'>{children}</Typography>
      </Grid.Item>
    </Grid>
  </Container>
)

const Sidebar = () => (
  <Container top='medium'>
    <Grid direction='column' alignItems='stretch' spacing={8}>
      <Grid.Item>
        <SidebarItem icon={<PortfolioDesigner16 />}>Overview</SidebarItem>
      </Grid.Item>
      <Grid.Item>
        <SidebarItem icon={<Profile16 />}>Jobs</SidebarItem>
      </Grid.Item>
      <Grid.Item>
        <SidebarItem icon={<Message16 />}>Candidates</SidebarItem>
      </Grid.Item>
      <Grid.Item>
        <SidebarItem icon={<Globe16 />}>Team</SidebarItem>
      </Grid.Item>
    </Grid>
  </Container>
)

const LayoutExample = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.Header title='How to layout a page' />
      <Page.Content>
        <PageGrid spacing={0}>
          <PageGridItem medium={4} large={2}>
            <Sidebar />
          </PageGridItem>
          <PageGridItem medium={8} large={10}>
            Main Content
          </PageGridItem>
        </PageGrid>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const PageGrid = styled(Grid)`
  height: 100%;
  margin: 0;
`

const PageGridItem = styled(Grid.Item)`
  height: 100%;
`

export default LayoutExample
