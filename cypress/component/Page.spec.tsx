import React from 'react'
import type { PageSidebarProps } from '@toptal/picasso'
import { Container, Menu, Page, Typography } from '@toptal/picasso'
import { getCheckpoints } from '@toptal/picasso/test-utils'

const component = 'Page'
const containerHeight = '30rem'

const checkpoints = getCheckpoints()

// Sidebar menu has custom breakpoint at 1280px that changes its behavior, so 1280px
// acts as a divider for "small" and "wide" page checkpoints
const smallScreenCheckpoints = [
  ...checkpoints.filter(width => width < 1280),
  1279,
]
const wideScreenCheckpoints = [
  1280,
  ...checkpoints.filter(width => width >= 1280),
]

const responsiveHappoTargets = [
  ...smallScreenCheckpoints,
  ...wideScreenCheckpoints,
].reduce<Record<string, any>>((acc, width) => {
  const name = `chrome-desktop-width-${width}`

  acc[name] = {
    name,
    browser: 'chrome',
    viewport: `${width}x1024`,
  }

  return acc
}, {})

enum TestIds {
  WRAPPER = 'wrapper',
  SIDEBAR_SCROLLABLE_CONTAINER = 'sidebar-scrollable-container',
  MENU_CONTAINER = 'menu-container',
}

const Paragraph = () => (
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Sollicitudin ac orci
    phasellus egestas tellus rutrum tellus pellentesque eu. Elementum facilisis
    leo vel fringilla est ullamcorper eget nulla. Massa id neque aliquam
    vestibulum. Lorem donec massa sapien faucibus et molestie ac feugiat sed. In
    aliquam sem fringilla ut morbi tincidunt augue interdum velit. Erat velit
    scelerisque in dictum non. Eros donec ac odio tempor orci dapibus. Ac tortor
    vitae purus faucibus ornare suspendisse. Amet commodo nulla facilisi nullam
    vehicula. Lacus vel facilisis volutpat est velit egestas dui id. Tortor
    dignissim convallis aenean et tortor at risus. Mauris in aliquam sem
    fringilla ut morbi tincidunt augue interdum. Nisl suscipit adipiscing
    bibendum est ultricies integer.
  </Typography>
)

const Sidebar = (props: PageSidebarProps) => (
  <Page.Sidebar
    wrapperMaxHeight={`calc(${containerHeight} - 3.5rem)`}
    testIds={{
      scrollableContainer: TestIds.SIDEBAR_SCROLLABLE_CONTAINER,
    }}
    {...props}
  >
    <Page.Sidebar.Menu data-testid={TestIds.MENU_CONTAINER}>
      <Page.Sidebar.Item selected>Overview</Page.Sidebar.Item>
      <Page.Sidebar.Item>Jobs</Page.Sidebar.Item>
      <Page.Sidebar.Item>Candidates</Page.Sidebar.Item>
      <Page.Sidebar.Item>Team</Page.Sidebar.Item>
      <Page.Sidebar.Item>Users</Page.Sidebar.Item>
      <Page.Sidebar.Item disabled>Billing</Page.Sidebar.Item>
      <Page.Sidebar.Item
        badge={{ content: 5 }}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Terms and Conditions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Support</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        <Typography size='medium' color='inherit'>
          Legal Info
        </Typography>
      </Page.Sidebar.Item>
      <Page.Sidebar.Item badge={{ content: 10 }}>
        Menu item with surprisingly long text content
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top='small' bottom='small'>
    <Container bottom='small'>
      <Typography align='center' variant='heading' size='large'>
        Banner example
      </Typography>
    </Container>
    <Paragraph />
    <Paragraph />
    <Paragraph />
    <Paragraph />
    <Paragraph />
  </Container>
)

type ExampleProps = {
  sidebarProps?: PageSidebarProps
}

const Example = ({ sidebarProps }: ExampleProps) => (
  <div
    data-testid={TestIds.WRAPPER}
    style={{ height: containerHeight, overflowY: 'scroll' }}
  >
    <Page>
      <Page.TopBar
        rightContent={<RightContent />}
        title='Default example'
        testIds={{ hamburger: 'hamburger-button' }}
      />
      <Page.Banner>
        We are now in the process of reviewing your profile. After your profile
        has been checked, we will reach to you via email about next steps.
      </Page.Banner>
      <Page.Content>
        <Sidebar {...sidebarProps} />
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

describe('Page', () => {
  describe('when the sidebar is sticky', () => {
    it('sticks to TopBar on scroll', () => {
      cy.mount(<Example />)

      cy.get('body').happoScreenshot({
        component,
        variant: 'default',
      })

      // Scroll down
      cy.getByTestId(TestIds.WRAPPER).scrollTo(0, 200)

      cy.get('body').happoScreenshot({
        component,
        variant: 'default/sticky-sidebar',
      })

      // Scroll sidebar to the bottom
      cy.getByTestId(TestIds.SIDEBAR_SCROLLABLE_CONTAINER).scrollTo('bottom')
      // Scroll page to the bottom
      cy.getByTestId(TestIds.WRAPPER).scrollTo('bottom')

      cy.get('body').happoScreenshot({
        component,
        variant: 'default/sticky-sidebar-scroll-bottom',
      })
    })
  })

  describe('when the sidebar is not sticky', () => {
    it('scrolls with content', () => {
      cy.mount(<Example sidebarProps={{ disableSticky: true }} />)

      // Scroll down
      cy.getByTestId(TestIds.WRAPPER).scrollTo(0, 200)

      cy.get('body').happoScreenshot({
        component,
        variant: 'default/sidebar-scroll',
      })

      // Scroll page to the bottom
      cy.getByTestId(TestIds.WRAPPER).scrollTo('bottom')

      cy.get('body').happoScreenshot({
        component,
        variant: 'default/sidebar-scroll-bottom',
      })
    })
  })

  describe('for screen sizes smaller than 1280px', () => {
    Cypress._.each(smallScreenCheckpoints, width => {
      describe(`when page is rendered on a ${width} screen width`, () => {
        it('renders hamburger menu and hides sidebar', () => {
          cy.viewport(width, 1000)
          cy.mount(<Example />)

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-smaller-than-1280/${width}-initial`,
            targets: [responsiveHappoTargets[`chrome-desktop-width-${width}`]],
          })

          cy.getByTestId('hamburger-button').should('be.visible')
          cy.getByTestId('hamburger-button').realClick()

          cy.getByTestId(TestIds.MENU_CONTAINER).should('be.visible')

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-smaller-than-1280/${width}-opened-menu`,
            targets: [responsiveHappoTargets[`chrome-desktop-width-${width}`]],
          })

          cy.getByTestId('hamburger-button').realClick()

          cy.getByTestId(TestIds.MENU_CONTAINER).should('not.visible')

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-smaller-than-1280/${width}-closed-menu`,
            targets: [responsiveHappoTargets[`chrome-desktop-width-${width}`]],
          })
        })
      })
    })
  })

  describe('for screen sizes equal or bigger than 1280px', () => {
    Cypress._.each(wideScreenCheckpoints, width => {
      describe(`when page is rendered on a ${width} screen width`, () => {
        it('does not show hamburger menu button and renders sidebar', () => {
          cy.viewport(width, 1000)
          cy.mount(<Example />)

          cy.getByTestId('hamburger-button').should('not.be.visible')

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-bigger-or-equal-than-1280/${width}-default`,
            targets: [responsiveHappoTargets[`chrome-desktop-width-${width}`]],
          })
        })
      })
    })
  })
})
