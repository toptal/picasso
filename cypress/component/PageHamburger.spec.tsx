/* eslint-disable max-statements */
import { Menu, Overview16, Page } from '@toptal/picasso'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'
import React, { useCallback, useState } from 'react'

const TOGGLE_SIDEBAR_MENU_BUTTON_ID = 'toggle-sidebar-menu'
const TOGGLE_CENTER_CONTENT_MENU_BUTTON_ID = 'toggle-center-content-menu'
const HAMBURGER_ID = 'hamburger-icon'

const useToggle = (initialState: boolean) => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(
    () => setState(prevState => !prevState),
    [setState]
  )

  return [state, toggle] as const
}

const Sidebar = () => (
  <Page.Sidebar collapsible>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<Overview16 />} selected>
        Overview
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item>My Account</Menu.Item>
      <Menu.Item>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Example = () => {
  const [hasSidebar, toggleHasSidebar] = useToggle(false)
  const [hasCenterContent, toggleHasCenterContent] = useToggle(false)

  return (
    <Page hamburgerId='banner-and-sidebar-example'>
      <Page.TopBar
        rightContent={<RightContent />}
        testIds={{ hamburger: HAMBURGER_ID }}
        centerContent={
          hasCenterContent && (
            <Page.TopBar.Menu>
              <Page.TopBar.Item selected>Item 1</Page.TopBar.Item>
              <Page.TopBar.Item>Item 2</Page.TopBar.Item>
              <Page.TopBar.Item>Item 3</Page.TopBar.Item>
              <Page.TopBar.Item>Item 4</Page.TopBar.Item>
              <Page.TopBar.Item>Item 5</Page.TopBar.Item>
              <Page.TopBar.Item>Item 6</Page.TopBar.Item>
              {/* This won't be rendered. Maximum of 6 items is allowed */}
              <Page.TopBar.Item>Item 7</Page.TopBar.Item>
            </Page.TopBar.Menu>
          )
        }
        title='Default example'
      />
      <Page.Content>
        {hasSidebar && <Sidebar />}
        <Page.Article>
          <button
            data-testid={TOGGLE_SIDEBAR_MENU_BUTTON_ID}
            onClick={toggleHasSidebar}
          >
            Toggle sidebar
          </button>
          <button
            data-testid={TOGGLE_CENTER_CONTENT_MENU_BUTTON_ID}
            onClick={toggleHasCenterContent}
          >
            Toggle center content
          </button>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  )
}

describe('TopBarMenu', () => {
  it('sidebar and center content can co-exist', () => {
    const happoTarget = HAPPO_TARGETS[0]

    cy.viewport(happoTarget.width, 720)

    let counter = 0

    const screenshot = (variant: string) => {
      cy.get('body').happoScreenshot({
        component: 'PageHamburger',
        variant: `${counter++}.${variant}`,
        targets: [happoTarget],
      })
    }

    cy.mount(<Example />)

    cy.getByTestId(TOGGLE_SIDEBAR_MENU_BUTTON_ID).as('toggleSidebar')
    cy.getByTestId(TOGGLE_CENTER_CONTENT_MENU_BUTTON_ID).as(
      'toggleCenterContent'
    )

    screenshot('default')

    cy.getByTestId(HAMBURGER_ID).as('hamburger').should('not.be.visible')

    cy.get('@toggleSidebar').click()
    screenshot('sidebar-on')

    cy.get('@hamburger').should('be.visible')

    cy.get('@toggleSidebar').click()
    screenshot('sidebar-off')

    cy.get('@hamburger').should('not.be.visible')

    cy.get('@toggleCenterContent').click()
    screenshot('centerContent-on')

    cy.get('@hamburger').should('be.visible')

    cy.get('@toggleCenterContent').click()
    screenshot('centerContent-off')

    cy.get('@hamburger').should('not.be.visible')

    cy.get('@toggleCenterContent').click()
    cy.get('@toggleSidebar').click()
    screenshot('both-on')

    cy.get('@hamburger').should('be.visible')

    cy.get('@toggleCenterContent').click()
    cy.get('@toggleSidebar').click()
    screenshot('both-off')

    cy.get('@hamburger').should('not.be.visible')
  })
})
