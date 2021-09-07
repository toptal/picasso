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

describe('Button.Split', () => {
  it('renders primary variant states', () => {
    mount(
      <TestingPicasso>
        <Container flex gap='1rem' padded='small'>
          <Button.Split text='Normal' menu={menu} />

          <Button.Split
            text='Action Hovered'
            menu={menu}
            actionButtonProps={{ hovered: true }}
          />
          <Button.Split
            text='Menu Hovered'
            menu={menu}
            menuButtonProps={{ hovered: true }}
          />

          <Button.Split
            text='Action Focused'
            menu={menu}
            actionButtonProps={{ focused: true }}
          />
          <Button.Split
            text='Menu Focused'
            menu={menu}
            menuButtonProps={{ focused: true }}
          />

          <Button.Split
            text='Action Active'
            menu={menu}
            actionButtonProps={{ active: true }}
          />
          <Button.Split
            text='Menu Active'
            menu={menu}
            menuButtonProps={{ active: true }}
          />

          <Button.Split text='Disabled' menu={menu} disabled />
        </Container>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders secondary variant states', () => {
    mount(
      <TestingPicasso>
        <Container flex gap='1rem' padded='small'>
          <Button.Split text='Normal' variant='secondary' menu={menu} />

          <Button.Split
            text='Action Hovered'
            variant='secondary'
            menu={menu}
            actionButtonProps={{ hovered: true }}
          />
          <Button.Split
            text='Menu Hovered'
            variant='secondary'
            menu={menu}
            menuButtonProps={{ hovered: true }}
          />

          <Button.Split
            text='Action Focused'
            variant='secondary'
            menu={menu}
            actionButtonProps={{ focused: true }}
          />
          <Button.Split
            text='Menu Focused'
            variant='secondary'
            menu={menu}
            menuButtonProps={{ focused: true }}
          />

          <Button.Split
            text='Action Active'
            variant='secondary'
            menu={menu}
            actionButtonProps={{ active: true }}
          />
          <Button.Split
            text='Menu Active'
            variant='secondary'
            menu={menu}
            menuButtonProps={{ active: true }}
          />

          <Button.Split
            text='Disabled'
            variant='secondary'
            menu={menu}
            disabled
          />
        </Container>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('opens dropdown when menu button is clicked', () => {
    mount(
      <TestingPicasso>
        <Container padded='small'>
          <Button.Split
            testIds={{ menuButton: 'menuButton' }}
            text='Button'
            menu={menu}
          />
        </Container>
      </TestingPicasso>
    )

    cy.get('[data-testid=menuButton]').click()

    cy.get('body').happoScreenshot()
  })
})
