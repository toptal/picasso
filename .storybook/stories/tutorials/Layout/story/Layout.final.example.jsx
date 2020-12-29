import React from 'react'
import styled from 'styled-components'
import { Page, Container, Typography, Table, Sidebar } from '@toptal/picasso'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

const SidebarMenu = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Sidebar.Item>
      <Sidebar.Item icon={<Profile16 />}>Contacts</Sidebar.Item>
      <Sidebar.Item icon={<Globe16 />}>Team</Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

const MainContent = () => (
  <StyledDetailsContainer top='medium' bottom='medium'>
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
  </StyledDetailsContainer>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <MainContent />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const StyledDetailsContainer = styled(Container)`
  background-color: ${palette.common.white};
`

export default Example
