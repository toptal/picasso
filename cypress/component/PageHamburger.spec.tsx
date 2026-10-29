/* eslint-disable max-statements */
import { Menu, Overview16, Page } from '@toptal/picasso'
import { FOCUS_RING as RING_CLASSES } from '@toptal/picasso-shared'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'
import React, { useCallback, useState } from 'react'

import {
  FOCUS_RING,
  WHITE_FOCUS_RING,
  toHaveStyle,
  toMatchFocusVisible,
} from '../support/focus'

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

const VariantExample = ({ variant }: { variant: 'dark' | 'light' }) => (
  <Page hamburgerId={`${variant}-example`}>
    <Page.TopBar
      variant={variant}
      rightContent={<RightContent />}
      testIds={{ hamburger: HAMBURGER_ID }}
      title={`${variant} example`}
    />
    <Page.Content>
      <Sidebar />
      <Page.Article>
        <button>After</button>
      </Page.Article>
    </Page.Content>
  </Page>
)

// Happo drops `:focus-visible`, so the screenshot gets the forced ring class
const takeFocusedScreenshot = (
  variant: 'dark' | 'light',
  happoTarget: (typeof HAPPO_TARGETS)[number]
) => {
  const ring = RING_CLASSES[variant === 'light' ? 'blue' : 'white'].focused

  cy.getByTestId(HAMBURGER_ID)
    .invoke('addClass', ring)
    .should(
      toHaveStyle(
        'boxShadow',
        variant === 'light' ? FOCUS_RING : WHITE_FOCUS_RING
      )
    )
  cy.get('body').happoScreenshot({
    component: 'PageHamburger',
    variant: `${variant}/after-focused`,
    targets: [happoTarget],
  })
  cy.getByTestId(HAMBURGER_ID).invoke('removeClass', ring)
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

    cy.getByTestId(HAMBURGER_ID).should('not.exist')

    cy.get('@toggleSidebar').click()
    screenshot('sidebar-on')

    cy.getByTestId(HAMBURGER_ID).should('be.visible')

    cy.get('@toggleSidebar').click()
    screenshot('sidebar-off')

    cy.getByTestId(HAMBURGER_ID).should('not.exist')

    cy.get('@toggleCenterContent').click()
    screenshot('centerContent-on')

    cy.getByTestId(HAMBURGER_ID).should('be.visible')

    cy.get('@toggleCenterContent').click()
    screenshot('centerContent-off')

    cy.getByTestId(HAMBURGER_ID).should('not.exist')

    cy.get('@toggleCenterContent').click()
    cy.get('@toggleSidebar').click()
    screenshot('both-on')

    cy.getByTestId(HAMBURGER_ID).should('be.visible')

    cy.get('@toggleCenterContent').click()
    cy.get('@toggleSidebar').click()
    screenshot('both-off')

    cy.getByTestId(HAMBURGER_ID).should('not.exist')
  })

  describe('when the top bar variant is light', () => {
    it('renders a dark hamburger button', () => {
      const happoTarget = HAPPO_TARGETS[0]
      const component = 'PageHamburger'

      cy.viewport(happoTarget.width, 720)
      cy.mount(<VariantExample variant='light' />)

      cy.getByTestId(HAMBURGER_ID).should('be.visible')
      cy.get('body').happoScreenshot({
        component,
        variant: 'light/default',
        targets: [happoTarget],
      })

      cy.getByTestId(HAMBURGER_ID).hoverAndTakeHappoScreenshot({
        component,
        variant: 'light/after-hovered',
        targets: [happoTarget],
      })

      takeFocusedScreenshot('light', happoTarget)
    })
  })

  describe('when the top bar variant is dark', () => {
    it('renders a focused hamburger button', () => {
      const happoTarget = HAPPO_TARGETS[0]

      cy.viewport(happoTarget.width, 720)
      cy.mount(<VariantExample variant='dark' />)

      cy.getByTestId(HAMBURGER_ID).should('be.visible')
      takeFocusedScreenshot('dark', happoTarget)
    })
  })

  describe('when the hamburger is focused', () => {
    const RINGS = { light: FOCUS_RING, dark: WHITE_FOCUS_RING }

    ;(['light', 'dark'] as const).forEach(variant => {
      it(`shows a square focus ring on keyboard focus on a ${variant} top bar`, () => {
        cy.viewport(HAPPO_TARGETS[0].width, 720)
        cy.mount(<VariantExample variant={variant} />)

        cy.contains('After').realClick()
        cy.realPress(['Shift', 'Tab'])

        cy.getByTestId(HAMBURGER_ID)
          .should('have.focus')
          .and(toMatchFocusVisible(true))
          .and(toHaveStyle('boxShadow', RINGS[variant]))
          .and(toHaveStyle('borderRadius', '4px'))
      })
    })

    it('does not show focus ring on mouse focus', () => {
      cy.viewport(HAPPO_TARGETS[0].width, 720)
      cy.mount(<VariantExample variant='light' />)

      cy.getByTestId(HAMBURGER_ID).realClick()

      cy.getByTestId(HAMBURGER_ID)
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })
})
