import React from 'react'
import { Button, Container, Menu } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const handleClick = () => {}

const menu = (
  <Menu data-testid='menu'>
    <Menu.Item onClick={handleClick}>First item</Menu.Item>
    <Menu.Item onClick={handleClick}>Second item</Menu.Item>
    <Menu.Item onClick={handleClick}>Third item</Menu.Item>
  </Menu>
)

const component = 'ButtonSplit'

describe('Button.Split', () => {
  it('opens dropdown when menu button is clicked', () => {
    cy.mount(
      <Container padded={SPACING_4}>
        <Button.Split testIds={{ menuButton: 'menu-button' }} menu={menu}>
          Button
        </Button.Split>
      </Container>
    )

    cy.getByTestId('menu-button').click()

    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-clicked',
    })
  })
})
