import React from 'react'
import {
  Page,
  Container,
  Typography,
  Table,
  Sidebar,
  Helpbox,
  PageHead
} from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso/Icon'

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
  <Page.Article>
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Profile</PageHead.Title>
      </PageHead.Main>
    </PageHead>
    <Section title='Details'>
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
    </Section>
    <Section title='Notes'>
      <Helpbox>
        <Helpbox.Title>Incomplete profile</Helpbox.Title>
        <Helpbox.Content>
          Talent's profile is incomplete. Please fill in required fields.
        </Helpbox.Content>
      </Helpbox>
    </Section>
  </Page.Article>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <MainContent />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
