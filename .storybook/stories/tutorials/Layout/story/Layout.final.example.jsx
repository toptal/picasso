import React from 'react'
import styled from 'styled-components'
import { Page, Grid, Container, Typography, Table } from '@toptal/picasso'
import { Globe, Profile, Portfolio, Message } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

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

const MainContent = () => (
  <MainContentContainer padded='medium'>
    <DetailsContainer padded='medium'>
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          UI/UX Designer
        </Typography>
        <Typography size='small'>Posted at: Nov 24, 2019</Typography>
      </Container>
      <Table>
        <Table.Body>
          <Table.Row key='talent'>
            <Table.Cell>
              <Typography variant='heading' size='small'>
                Talent:
              </Typography>
            </Table.Cell>
            <Table.Cell>Hugo, John, Dean</Table.Cell>
          </Table.Row>
          <Table.Row key='commitment'>
            <Table.Cell>
              <Typography variant='heading' size='small'>
                Commitment:
              </Typography>
            </Table.Cell>
            <Table.Cell>Hourly</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </DetailsContainer>
  </MainContentContainer>
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
            <MainContent />
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

const MainContentContainer = styled(Container)`
  background-color: ${palette.grey[100]};
  height: 100%;
`

const DetailsContainer = styled(Container)`
  background-color: ${palette.common.white};
`

export default LayoutExample
