import React from 'react'
import { mount } from '@cypress/react'
import { Tabs, Tooltip, Exclamation16, TabsProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestIcon = () => (
  <Tooltip content='Some content...' placement='top'>
    <span>
      <Exclamation16 color='red' />
    </span>
  </Tooltip>
)

const TestTabs = ({ children, ...props }: Partial<TabsProps>) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={handleChange} {...props}>
      {children}
    </Tabs>
  )
}

interface RenderTabsArgs {
  width?: number | string
  disabledIndicies?: number[]
  withIconIndicies?: number[]
}

const getTabTestId = (index: number) => `tab-${index}`
const getTabSelector = (index: number) =>
  `[data-testid="${getTabTestId(index)}"]`
const getScrollButtonSelector = (direction: string) =>
  `[data-testid="tab-scroll-button-${direction}"]`

const renderTabs = ({
  width,
  disabledIndicies = [],
  withIconIndicies = []
}: RenderTabsArgs = {}) => {
  return (
    <TestingPicasso>
      <div style={{ width }}>
        <TestTabs data-testid='tabs'>
          {Array.from({ length: 5 }).map((_, index) => {
            const testId = getTabTestId(index)
            const icon = withIconIndicies.includes(index) ? (
              <TestIcon />
            ) : undefined

            return (
              <Tabs.Tab
                key={testId}
                data-testid={testId}
                disabled={disabledIndicies.includes(index)}
                label='Label'
                icon={icon}
              />
            )
          })}
        </TestTabs>
      </div>
    </TestingPicasso>
  )
}

describe('Tabs', () => {
  it('renders', () => {
    mount(renderTabs())

    cy.get('body').happoScreenshot()
  })

  it('renders disabled', () => {
    mount(renderTabs({ disabledIndicies: [1] }))

    cy.get('body').happoScreenshot()
  })

  it('renders with icon', () => {
    mount(renderTabs({ withIconIndicies: [1, 3] }))

    cy.get('body').happoScreenshot()
  })

  it('navigates with scroll buttons', () => {
    const SMALL_SCREEN_MAX_WIDTH = 576

    cy.viewport(SMALL_SCREEN_MAX_WIDTH, Cypress.config('viewportHeight'))

    mount(renderTabs())

    cy.get(getTabSelector(0)).should('be.visible')
    cy.get(getTabSelector(4)).should('not.be.visible')
    cy.get(getScrollButtonSelector('left')).should('not.exist')
    cy.get(getScrollButtonSelector('right')).should('be.visible')
    cy.get('body').happoScreenshot()

    cy.get(getScrollButtonSelector('right')).click()
    cy.get(getTabSelector(0)).should('not.be.visible')
    cy.get(getTabSelector(4)).should('be.visible')
    cy.get(getScrollButtonSelector('left')).should('be.visible')
    cy.get(getScrollButtonSelector('right')).should('not.exist')

    cy.get(getScrollButtonSelector('left')).click()
    cy.get(getTabSelector(0)).should('be.visible')
    cy.get(getTabSelector(4)).should('not.be.visible')
    cy.get(getScrollButtonSelector('left')).should('not.exist')
    cy.get(getScrollButtonSelector('right')).should('be.visible')
  })
})
