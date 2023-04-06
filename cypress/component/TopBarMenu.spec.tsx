import React from 'react'
import type { BaseProps } from '@toptal/picasso'
import {
  Archive24,
  Award16,
  BankWire16,
  Candidates16,
  Overview16,
  Page,
  Referral16,
  Team16,
} from '@toptal/picasso'

const TopBarMenuExample = ({ 'data-testid': testId }: BaseProps) => {
  return (
    <Page.TopBar.Menu data-testid={testId}>
      <Page.TopBar.Item icon={<Candidates16 />}>Item 1</Page.TopBar.Item>
      <Page.TopBar.Item icon={<Team16 />}>Item 2</Page.TopBar.Item>
      <Page.TopBar.Item icon={<Overview16 />}>Item 3</Page.TopBar.Item>
      <Page.TopBar.Item icon={<Referral16 />}>Item 4</Page.TopBar.Item>
      <Page.TopBar.Item icon={<Archive24 />}>Item 5</Page.TopBar.Item>
      <Page.TopBar.Item icon={<Award16 />}>Item 6</Page.TopBar.Item>
      <Page.TopBar.Item icon={<BankWire16 />}>Item 7</Page.TopBar.Item>
    </Page.TopBar.Menu>
  )
}

describe('TopBarMenu', () => {
  it('renders maximum of 6 items', () => {
    cy.mount(<TopBarMenuExample data-testid='menu' />)

    cy.getByTestId('menu').children().should('have.length', 6)
  })
})
