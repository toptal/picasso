import React from 'react'
import type { PageSidebarProps } from '@toptal/picasso'
import { Container, Menu, Page, Typography } from '@toptal/picasso'

const component = 'Page'
const containerHeight = '30rem'

enum TestIds {
  WRAPPER = 'wrapper',
  SIDEBAR_SCROLLABLE_CONTAINER = 'sidebar-scrollable-container',
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
    <Page.Sidebar.Menu>
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
    <Page hamburgerId='banner-and-sidebar-example'>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
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
  describe('responsive test', () => {
    const sizes = [
      { name: 'xs', width: 375, height: 667 },
      { name: 'sm', width: 480, height: 1024 },
      { name: 'md', width: 768, height: 900 },
      { name: 'lg', width: 1024, height: 900 },
      { name: 'xl', width: 1280, height: 900 },
    ]

    sizes.forEach(({ name, width, height }) => {
      // eslint-disable-next-line max-nested-callbacks
      it(`Should display correctly on all ${name}`, () => {
        // Set viewport to desired size
        cy.viewport(width, height)

        // Render component
        cy.mount(<Example />)

        // Take a snapshot for visual diffing
        cy.get('body').happoScreenshot({
          component,
          variant: `default/responsive-${name}`,
          targets: [
            // This is taken from Happo documentation, types are wrong
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            { name, browser: 'chrome', viewport: `${width}x${height}` },
          ],
        })
      })
    })
  })

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
})
