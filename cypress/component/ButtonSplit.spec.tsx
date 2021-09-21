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
  const TestingButtonSplit = (props: Props) => (
    <TestingPicasso>
      <Container flex gap='1rem' padded='small'>
        <Button.Split
          testIds={testIds}
          menu={menu}
          variant={variant}
          {...props}
        >
          {props.children}
        </Button.Split>
      </Container>
    </TestingPicasso>
  )

  it('renders normal state', () => {
    mount(<TestingButtonSplit>Normal</TestingButtonSplit>)

    cy.get('body').happoScreenshot()
  })

  it('renders action hovered', () => {
    mount(<TestingButtonSplit>Action Hovered</TestingButtonSplit>)

    getActionButton().realHover()

    cy.get('body').happoScreenshot()
  })

  it('renders menu hovered', () => {
    mount(<TestingButtonSplit>Menu Hovered</TestingButtonSplit>)

    getMenuButton().realHover()

    cy.get('body').happoScreenshot()
  })

  it('renders action focused', () => {
    mount(<TestingButtonSplit>Action Focused</TestingButtonSplit>)

    getActionButton().focus()

    cy.get('body').happoScreenshot()
  })

  it('renders menu focused', () => {
    mount(<TestingButtonSplit>Menu Focused</TestingButtonSplit>)

    getMenuButton().focus()

    cy.get('body').happoScreenshot()
  })

  it('renders action active', () => {
    mount(<TestingButtonSplit>Action Active</TestingButtonSplit>)

    getActionButton().realMouseDown()

    cy.get('body').happoScreenshot()
  })

  it('renders menu active', () => {
    mount(<TestingButtonSplit>Menu Active</TestingButtonSplit>)

    getMenuButton().realMouseDown()

    cy.get('body').happoScreenshot()
  })

  it('renders disabled', () => {
    mount(<TestingButtonSplit disabled>Disabled</TestingButtonSplit>)

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
