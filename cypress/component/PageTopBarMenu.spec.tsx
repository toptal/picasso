import React from 'react'
import {
  Page,
  Menu,
  PortfolioDesigner16,
  Profile16,
  Globe16,
  Referral16,
  Award16,
  Box16,
} from '@toptal/picasso'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'

export enum TestIds {
  TopBarMenu = 'page-top-bar-menu-dropdown',
}

const Example = ({ src }: { src: string | null }) => (
  <Page hamburgerId='hamburger-withicons-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item icon={<PortfolioDesigner16 />}>
            Item 1
          </Page.TopBar.Item>
          <Page.TopBar.Item icon={<Profile16 />}>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Globe16 />}>Item 3</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Award16 />}>Item 4</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Referral16 />}>Item 5</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Box16 />}>Item 6</Page.TopBar.Item>
        </Page.TopBar.Menu>
      }
      rightContent={
        <Page.TopBarMenu
          name='Jacqueline Roque'
          avatar={src || ''}
          data-testid={TestIds.TopBarMenu}
        >
          <Menu>
            <Menu.Item>My Account</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        </Page.TopBarMenu>
      }
    />
  </Page>
)

describe('PageTopBarMenu', () => {
  let src: string | null = null

  before(() => {
    // eslint-disable-next-line promise/catch-or-return
    cy.fixture('pablo.jpg').then(image => {
      src = 'data:image/jpg;base64,' + image

      return image
    })
  })

  Cypress._.each(HAPPO_TARGETS, happoTarget => {
    const { width } = happoTarget

    it(`renders correctly on ${width}px`, () => {
      cy.viewport(width, 800)
      cy.mount(<Example src={src} />)

      cy.getByTestId(TestIds.TopBarMenu).click()

      cy.get('body').happoScreenshot({
        component: 'PageTopBarMenu',
        variant: `width-${width}`,
        targets: [happoTarget],
      })
    })
  })
})
