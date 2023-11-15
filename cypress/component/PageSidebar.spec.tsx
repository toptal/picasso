import React from 'react'
import type { PageSidebarProps } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import {
  Candidates16,
  Container,
  Grid,
  Logo,
  Overview16,
  Page,
  Referral16,
  Team16,
  Typography,
} from '@toptal/picasso'

const component = 'PageSidebar'

enum TestIds {
  SIDEBAR_COLLAPSE_BUTTON = 'sidebar-collapse-button',
  SIDEBAR_CONTAINER = 'sidebar-container',

  ITEM_ICON = 'sidebar-item-icon',
  ITEM_TEXT_CONTENT = 'sidebar-item-content',

  BASIC_MENU_INNER_MENU = 'basic-menu-inner-menu',

  COLLAPSIBLE_MENU_HEADER = 'collapsible-header',
  COLLAPSIBLE_MENU_INNER_MENU = 'collapsible-inner-menu',
}

const SidebarExample = (props: PageSidebarProps) => {
  return (
    <Page.Sidebar
      {...props}
      testIds={{
        collapseButton: TestIds.SIDEBAR_COLLAPSE_BUTTON,
        container: TestIds.SIDEBAR_CONTAINER,
      }}
    >
      <Page.Sidebar.Logo
        collapsedLogo={
          <Logo
            emblem
            variant={props.variant === 'dark' ? 'white' : 'default'}
          />
        }
        fullLogo={<Logo />}
      />
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item
          icon={<Overview16 data-testid={TestIds.ITEM_ICON} />}
          selected
        >
          <span data-testid={TestIds.ITEM_TEXT_CONTENT}>Overview</span>
        </Page.Sidebar.Item>
        <Page.Sidebar.Item
          icon={<Team16 />}
          badge={{
            content: 5,
          }}
        >
          Team
        </Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Team16 />} badge={10}>
          Team
        </Page.Sidebar.Item>
        <Page.Sidebar.Item
          icon={<Referral16 />}
          menu={
            <Page.Sidebar.Menu data-testid={TestIds.BASIC_MENU_INNER_MENU}>
              <Page.Sidebar.Item badge={10}>Foo </Page.Sidebar.Item>
              <Page.Sidebar.Item>Bar</Page.Sidebar.Item>
            </Page.Sidebar.Menu>
          }
        >
          Referral
        </Page.Sidebar.Item>
        <Page.Sidebar.Item
          icon={<Referral16 />}
          testIds={{ header: TestIds.COLLAPSIBLE_MENU_HEADER }}
          collapsible
          menu={
            <Page.Sidebar.Menu
              data-testid={TestIds.COLLAPSIBLE_MENU_INNER_MENU}
            >
              <Page.Sidebar.Item>Foo</Page.Sidebar.Item>
              <Page.Sidebar.Item>Bar</Page.Sidebar.Item>
            </Page.Sidebar.Menu>
          }
        >
          Collapsible
        </Page.Sidebar.Item>
        <Page.Sidebar.Item
          icon={<Referral16 />}
          testIds={{ header: TestIds.COLLAPSIBLE_MENU_HEADER }}
          collapsible
          menu={
            <Page.Sidebar.Menu
              data-testid={TestIds.COLLAPSIBLE_MENU_INNER_MENU}
            >
              <Page.Sidebar.Item>Foo</Page.Sidebar.Item>
              <Page.Sidebar.Item badge={10} tag='New'>
                Bar
              </Page.Sidebar.Item>
            </Page.Sidebar.Menu>
          }
        >
          Collapsible
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
    <div
      style={{
        height: '58rem',
        maxHeight: '58rem',
        overflowY: 'scroll',
      }}
    >
      <SidebarExample {...props} />
    </div>
  )
}

const VariantsExample = () => {
  return (
    <Grid spacing={32}>
      <Grid.Item style={{ height: '58rem' }}>
        <Container bottom={SPACING_4}>
          <Typography variant='heading' size='small'>
            Light (default):
          </Typography>
        </Container>
        <SidebarExample variant='light' />
      </Grid.Item>

      <Grid.Item style={{ height: '58rem' }}>
        <Container bottom={SPACING_4}>
          <Typography variant='heading' size='small'>
            Dark:
          </Typography>
        </Container>
        <SidebarExample variant='dark' />
      </Grid.Item>
    </Grid>
  )
}

describe('Sidebar', () => {
  it('renders sidebar with items', () => {
    cy.mount(<DefaultExample />)

    cy.get('body').happoScreenshot({ component, variant: 'default-render' })
  })

  it('renders sidebar as dark and light variants', () => {
    cy.mount(<VariantsExample />)

    cy.get('body').happoScreenshot({ component, variant: 'with-theme' })
  })

  describe('when the sidebar is collapsible', () => {
    it('hides and shows the sidebar items text', () => {
      cy.mount(<DefaultExample collapsible />)

      // Expand collapsible Menu
      cy.getByTestId(TestIds.COLLAPSIBLE_MENU_HEADER).realClick()

      cy.get('body').happoScreenshot({
        component,
        variant: 'expanded accordion menu',
      })

      // Collapse sidebar
      cy.getByTestId(TestIds.SIDEBAR_CONTAINER).realHover()
      cy.getByTestId(TestIds.SIDEBAR_COLLAPSE_BUTTON).realClick()

      cy.getByTestId(TestIds.SIDEBAR_CONTAINER).realHover()

      cy.getByTestId(TestIds.ITEM_TEXT_CONTENT).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'collapsed sidebar default',
      })

      // Open collapsible Menu as dropdown
      cy.getByTestId(TestIds.COLLAPSIBLE_MENU_HEADER).realClick()

      cy.get('body').happoScreenshot({
        component,
        variant: 'open dropdown menu',
      })

      // Expand collapsed sidebar
      cy.getByTestId(TestIds.SIDEBAR_CONTAINER).realHover()
      cy.getByTestId(TestIds.SIDEBAR_COLLAPSE_BUTTON).realClick()

      cy.getByTestId(TestIds.ITEM_TEXT_CONTENT).should('exist')

      cy.get('body').happoScreenshot({ component, variant: 'expand sidebar' })
    })
  })
})
