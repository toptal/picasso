import React from 'react'
import { mount } from '@cypress/react'
import { Button, Container, Menu } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const handleClick = () => {}

const menu = (
  <Menu data-testid='menu'>
    <Menu.Item onClick={handleClick}>First item</Menu.Item>
    <Menu.Item onClick={handleClick}>Second item</Menu.Item>
    <Menu.Item onClick={handleClick}>Third item</Menu.Item>
  </Menu>
)

const testIds = {
  menuButton: 'menuButton',
  actionButton: 'actionButton'
}

const getMenuButton = () => cy.get(`[data-testid=${testIds.menuButton}]`)

describe('Button.Split', () => {
  it('opens dropdown when menu button is clicked', () => {
    mount(
      <TestingPicasso>
        <Container padded='small'>
          <Button.Split testIds={{ menuButton: 'menuButton' }} menu={menu}>
            Button
          </Button.Split>
        </Container>
      </TestingPicasso>
    )

    getMenuButton().click()

    cy.get('body').happoScreenshot()
  })
})
