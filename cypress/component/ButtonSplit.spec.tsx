import React from 'react'
import { Button, Container, Menu } from '@toptal/picasso'

const handleClick = () => {}

const menu = (
  <Menu data-testid='menu'>
    <Menu.Item onClick={handleClick}>First item</Menu.Item>
    <Menu.Item onClick={handleClick}>Second item</Menu.Item>
    <Menu.Item onClick={handleClick}>Third item</Menu.Item>
  </Menu>
)

const testIds = {
  menuButton: 'menu-button',
  actionButton: 'actionButton',
}

const getMenuButton = () => cy.get(`[data-testid=${testIds.menuButton}]`)

describe('Button.Split', () => {
  it('opens dropdown when menu button is clicked', () => {
    cy.mount(
      <Container padded='small'>
        <Button.Split testIds={{ menuButton: 'menu-button' }} menu={menu}>
          Button
        </Button.Split>
      </Container>
    )

    getMenuButton().click()

    cy.get('body').happoScreenshot()
  })
})
