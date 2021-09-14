import React, { ComponentProps } from 'react'
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

type ButtonSplitProps = ComponentProps<typeof Button.Split>
interface Props extends Omit<ButtonSplitProps, 'menu' | 'text'> {
  menu?: ButtonSplitProps['menu']
  text?: ButtonSplitProps['text']
}

const testIds = {
  menuButton: 'menuButton',
  actionButton: 'actionButton'
}

const renderButtonSplit = (props?: Props) => {
  mount(
    <TestingPicasso>
      <Container flex gap='1rem' padded='small'>
        <Button.Split testIds={testIds} text='Button' menu={menu} {...props} />
      </Container>
    </TestingPicasso>
  )
}

describe('Button.Split', () => {
  describe('Primary variant', () => {
    it('renders normal state', () => {
      renderButtonSplit()

      cy.get('body').happoScreenshot()
    })

    it('renders action hovered', () => {
      renderButtonSplit({ text: 'Normal' })

      cy.get(`[data-testid=${testIds.actionButton}]`).realHover()

      cy.get('body').happoScreenshot()
    })

    it('renders menu hovered', () => {
      renderButtonSplit({ text: 'Normal' })

      cy.get(`[data-testid=${testIds.menuButton}]`).realHover()

      cy.get('body').happoScreenshot()
    })

    it('renders action focused', () => {
      renderButtonSplit({ text: 'Action Focused' })

      cy.get(`[data-testid=${testIds.actionButton}]`).focus()

      cy.get('body').happoScreenshot()
    })

    it('renders menu focused', () => {
      renderButtonSplit({ text: 'Menu Focused' })

      cy.get(`[data-testid=${testIds.menuButton}]`).focus()

      cy.get('body').happoScreenshot()
    })

    it('renders action active', () => {})
    it('renders menu active', () => {})

    it('renders disabled', () => {})
  })

  // describe('Secondary variant', () => {

  // })

  it.skip('renders primary variant states', () => {
    mount(
      <TestingPicasso>
        <Container flex gap='1rem' padded='small'>
          {/* <Button.Split text='Normal' menu={menu} />

          <Button.Split
            text='Action Hovered'
            menu={menu}
            actionButtonProps={{ hovered: true }}
          />
          <Button.Split
            text='Menu Hovered'
            menu={menu}
            menuButtonProps={{ hovered: true }}
          /> */}

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

  it.skip('renders secondary variant states', () => {
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
