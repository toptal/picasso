import React from 'react'
import type { PageSidebarProps } from '@toptal/picasso'
import {
  Button,
  Container,
  Drawer,
  Menu,
  Page,
  Typography,
} from '@toptal/picasso'
import { HAPPO_TARGETS, getHappoTargets } from '@toptal/picasso/test-utils'
import { useNotifications } from '@toptal/picasso/utils'

const component = 'Page'
const containerHeight = '30rem'

enum TestIds {
  WRAPPER = 'wrapper',
  SIDEBAR_SCROLLABLE_CONTAINER = 'sidebar-scrollable-container',
  MENU_CONTAINER = 'menu-container',
  DRAWER_BUTTON = 'drawer-button',
  MENU_ITEM = 'menu_item',
  NOTIFICATION_BUTTON_PAGE = 'notification-button-page',
  NOTIFICATION_BUTTON_DRAWER = 'notification-button-drawer',
  NOTIFICATION_CONTENT = 'notification-content',
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

const Content = () => {
  const { showInfo } = useNotifications()

  return (
    <Container top='small' bottom='small'>
      <Container bottom='small'>
        <Typography align='center' variant='heading' size='large'>
          Banner example
        </Typography>
      </Container>
      <Container>
        <Button
          data-testid={TestIds.NOTIFICATION_BUTTON_PAGE}
          onClick={() =>
            showInfo(
              <div data-testid={TestIds.NOTIFICATION_CONTENT}>
                Test content
              </div>,
              undefined,
              { persist: true }
            )
          }
        >
          Show notification
        </Button>
      </Container>
      <Paragraph />
      <Paragraph />
      <Paragraph />
      <Paragraph />
      <Paragraph />
      <Paragraph />
      <Paragraph />
      <Paragraph />
    </Container>
  )
}

const DrawerContent = () => {
  const [open, setOpen] = React.useState(false)
  const { showInfo } = useNotifications()

  return (
    <Page data-testid={TestIds.WRAPPER}>
      <Page.TopBar />
      <Page.Content data-testid={TestIds.MENU_CONTAINER}>
        <Page.Sidebar
          wrapperMaxHeight={`calc(800px - 3.5rem)`}
          style={{ height: 'unset' }}
        >
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item selected testIds={{ header: TestIds.MENU_ITEM }}>
              Overview
            </Page.Sidebar.Item>
            <Page.Sidebar.Item>Jobs</Page.Sidebar.Item>
          </Page.Sidebar.Menu>

          <Page.Sidebar.Menu bottom>
            <Page.Sidebar.Item>Help</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        </Page.Sidebar>
        <Page.Article>
          <Content />
          <Drawer onClose={() => setOpen(false)} open={open}>
            <Container>Drawer Content</Container>
            <Container>
              <Button
                data-testid={TestIds.NOTIFICATION_BUTTON_DRAWER}
                onClick={() =>
                  showInfo(
                    <div data-testid={TestIds.NOTIFICATION_CONTENT}>
                      Test content
                    </div>,
                    undefined,
                    { persist: true }
                  )
                }
              >
                Show notification
              </Button>
            </Container>
          </Drawer>
          <Button
            data-testid={TestIds.DRAWER_BUTTON}
            onClick={() => setOpen(!open)}
          >
            Open drawer
          </Button>
        </Page.Article>
      </Page.Content>
    </Page>
  )
}

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
    // TODO: restore in https://toptal-core.atlassian.net/browse/FX-4358
    it.skip('retains sticky position when Drawer is open', () => {
      cy.viewport(1280, 800)
      cy.mount(<DrawerContent />)

      cy.getByTestId(TestIds.MENU_CONTAINER)
        .getByTestId(TestIds.MENU_ITEM)
        .should('be.visible')
      cy.scrollTo('bottom')

      cy.getByTestId(TestIds.DRAWER_BUTTON).click()

      cy.get('body').happoScreenshot({
        component,
        variant: 'default/sticky-sidebar-scroll-bottom-with-drawer',
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

  describe.only('when TopBar exists', () => {
    describe('when drawer is open', () => {
      it('renders notifications with extra top padding', () => {
        cy.mount(<DrawerContent />)
        cy.getByTestId(TestIds.DRAWER_BUTTON).click()
        cy.getByTestId(TestIds.NOTIFICATION_BUTTON_DRAWER).click()
        cy.getByTestId(TestIds.NOTIFICATION_CONTENT).contains('Test content')
        cy.get('body').happoScreenshot({
          component,
          variant: `notification-display-with-top-bar`,
        })
      })
    })

    describe('when drawer is not open', () => {
      it('renders notifications without extra top padding', () => {
        cy.mount(<DrawerContent />)
        cy.getByTestId(TestIds.NOTIFICATION_BUTTON_PAGE).click()
        cy.getByTestId(TestIds.NOTIFICATION_CONTENT).contains('Test content')
        cy.get('body').happoScreenshot({
          component,
          variant: `notification-display-with-top-bar-and-drawer`,
        })
      })
    })
  })

  // Sidebar menu has custom breakpoint at 1280px that changes its behavior
  const customBreakpoint = 1280
  const extendedHappoTargets = [
    ...HAPPO_TARGETS,
    ...getHappoTargets([customBreakpoint - 1, customBreakpoint]),
  ]

  Cypress._.each(extendedHappoTargets, happoTarget => {
    const { width } = happoTarget
    const isSmallScreenTarget = width < customBreakpoint

    if (isSmallScreenTarget) {
      describe(`when screen has ${width}px width`, () => {
        it('renders hamburger menu and hides sidebar', () => {
          cy.viewport(width, 1000)
          cy.mount(<Example />)

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-smaller-than-1280/${width}-initial`,
            targets: [happoTarget],
          })

          cy.getByTestId('hamburger-button').should('be.visible')
          cy.getByTestId('hamburger-button').realClick()

          cy.getByTestId(TestIds.MENU_CONTAINER).should('be.visible')

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-smaller-than-1280/${width}-opened-menu`,
            targets: [happoTarget],
          })

          cy.getByTestId('hamburger-button').realClick()

          cy.getByTestId(TestIds.MENU_CONTAINER).should('not.visible')

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-smaller-than-1280/${width}-closed-menu`,
            targets: [happoTarget],
          })
        })
      })
    } else {
      describe(`when screen has ${width}px width`, () => {
        it('does not show hamburger menu button and renders sidebar', () => {
          cy.viewport(width, 1000)
          cy.mount(<Example />)

          cy.getByTestId('hamburger-button').should('not.be.visible')

          cy.get('body').happoScreenshot({
            component,
            variant: `page-menu-screen-bigger-or-equal-than-1280/${width}-default`,
            targets: [happoTarget],
          })
        })
      })
    }
  })
})
