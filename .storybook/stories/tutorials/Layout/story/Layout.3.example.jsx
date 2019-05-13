import React from 'react'
import styled from 'styled-components'
import { Page, Grid, Container, Typography } from '@toptal/picasso'
import { Globe, Profile, Portfolio, Message } from '@toptal/picasso/Icon'

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
        <SidebarItem icon={<Portfolio />}>Overview</SidebarItem>
      </Grid.Item>
      <Grid.Item>
        <SidebarItem icon={<Profile />}>Jobs</SidebarItem>
      </Grid.Item>
      <Grid.Item>
        <SidebarItem icon={<Message />}>Candidates</SidebarItem>
      </Grid.Item>
      <Grid.Item>
        <SidebarItem icon={<Globe />}>Team</SidebarItem>
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
