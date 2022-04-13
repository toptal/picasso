import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import {
  Candidates16,
  Container,
  Grid,
  Logo,
  Overview16,
  Page,
  PageSidebarProps,
  Typography
} from '@toptal/picasso'

const SidebarExample = (props: PageSidebarProps) => {
  return (
    <Page.Sidebar
      {...props}
      testIds={{
        collapseButton: 'collapse-button',
        container: 'container'
      }}
    >
      <Page.Sidebar.Logo collapseLogo={<Logo emblem />} fullLogo={<Logo />} />
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item
          icon={<Overview16 data-testid='sidebar-item-icon' />}
          selected
        >
          <span data-testid='sidebar-item-text-content'>Overview</span>
        </Page.Sidebar.Item>
      </Page.Sidebar.Menu>

      <Page.Sidebar.Menu bottom>
        <Page.Sidebar.Item icon={<Candidates16 />}>
          Opportunities
        </Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  )
}

const DefaultExample = (props: PageSidebarProps) => {
  return (
    <TestingPicasso>
      <div
        style={{
          height: '58rem',
          maxHeight: '58rem',
          overflowY: 'scroll'
        }}
      >
        <SidebarExample {...props} />
      </div>
    </TestingPicasso>
  )
}

const VariantsExample = () => {
  return (
    <TestingPicasso>
      <Grid spacing={32}>
        <Grid.Item style={{ height: '58rem' }}>
          <Container bottom='small'>
            <Typography variant='heading' size='small'>
              Light (default):
            </Typography>
          </Container>
          <SidebarExample variant='light' />
        </Grid.Item>

        <Grid.Item style={{ height: '58rem' }}>
          <Container bottom='small'>
            <Typography variant='heading' size='small'>
              Dark:
            </Typography>
          </Container>
          <SidebarExample variant='dark' />
        </Grid.Item>
      </Grid>
    </TestingPicasso>
  )
}

describe('Sidebar', () => {
  it('renders sidebar with items', () => {
    mount(<DefaultExample />)

    cy.get('body').happoScreenshot()
  })

  it('renders sidebar as dark and light variants', () => {
    mount(<VariantsExample />)

    cy.get('body').happoScreenshot()
  })

  describe('when the sidebar is collapsible', () => {
    it('hides and shows the sidebar items text', () => {
      mount(<DefaultExample collapsible />)

      cy.get('[data-testid="collapse-button"]')
        .as('collapseButton')
        .should('not.be.visible')

      cy.get('[data-testid="container"]')
        .as('container')
        .realHover()
        .find('[data-testid="collapse-button"]')
        .realClick()

      cy.get('@collapseButton').should('not.be.visible')
      cy.get('@container').realHover()

      cy.get('body').happoScreenshot()

      cy.get('@container')
        .realHover()
        .find('[data-testid="collapse-button"]')
        .realClick()

      cy.get('body').happoScreenshot()
    })
  })
})
