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

const getMenuButton = () => cy.get(`[data-testid=${testIds.menuButton}]`)
const getActionButton = () => cy.get(`[data-testid=${testIds.actionButton}]`)

const testStates = ({
  variant = 'primary'
}: { variant?: Props['variant'] } = {}) => {
  const TestingButtonSplit = (props?: Props) => (
    <TestingPicasso>
      <Container flex gap='1rem' padded='small'>
        <Button.Split
          testIds={testIds}
          text='Button'
          menu={menu}
          variant={variant}
          {...props}
        />
      </Container>
    </TestingPicasso>
  )

  it('renders normal state', () => {
    mount(<TestingButtonSplit text='Normal' />)

    cy.get('body').happoScreenshot()
  })

  it('renders action hovered', () => {
    mount(<TestingButtonSplit text='Action Hovered' />)

    getActionButton().realHover()

    cy.get('body').happoScreenshot()
  })

  it('renders menu hovered', () => {
    mount(<TestingButtonSplit text='Menu Hovered' />)

    getMenuButton().realHover()

    cy.get('body').happoScreenshot()
  })

  it('renders action focused', () => {
    mount(<TestingButtonSplit text='Action Focused' />)

    getActionButton().focus()

    cy.get('body').happoScreenshot()
  })

  it('renders menu focused', () => {
    mount(<TestingButtonSplit text='Menu Focused' />)

    getMenuButton().focus()

    cy.get('body').happoScreenshot()
  })

  it('renders action active', () => {
    mount(<TestingButtonSplit text='Action Active' />)

    getActionButton().realMouseDown()

    cy.get('body').happoScreenshot()
  })

  it('renders menu active', () => {
    mount(<TestingButtonSplit text='Menu Active' />)

    getMenuButton().realMouseDown()

    cy.get('body').happoScreenshot()
  })

  it('renders disabled', () => {
    mount(<TestingButtonSplit text='Disabled' disabled />)

    getMenuButton().click({ force: true })

    cy.get('body').happoScreenshot()
  })
}

describe('Button.Split', () => {
  context('Primary variant', () => {
    testStates()
  })

  context('Secondary variant', () => {
    testStates({ variant: 'secondary' })
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

    getMenuButton().click()

    cy.get('body').happoScreenshot()
  })
})
