import React from 'react'
import { mount } from '@cypress/react'
import { Tabs, Tooltip, Exclamation16 } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

interface TestTabsProps {
  width?: number | string
  disabledIndex?: number
  withIconIndicies?: number[]
}

const TestIcon = () => (
  <Tooltip content='Some content...' placement='top'>
    <span>
      <Exclamation16 color='red' />
    </span>
  </Tooltip>
)

const TestTabs = ({
  width,
  disabledIndex,
  withIconIndicies = []
}: TestTabsProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <TestingPicasso>
      <div style={{ width }}>
        <Tabs value={value} onChange={handleChange} data-testid='tabs'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Tabs.Tab
              disabled={disabledIndex === index}
              key={index}
              label='Label'
              data-testid={`tab-${index}`}
              icon={withIconIndicies.includes(index) ? <TestIcon /> : undefined}
            />
          ))}
        </Tabs>
      </div>
    </TestingPicasso>
  )
}

describe('Tabs', () => {
  it('renders', () => {
    mount(<TestTabs />)

    cy.get('body').happoScreenshot()
  })

  it('renders disabled', () => {
    mount(<TestTabs disabledIndex={1} />)

    cy.get('body').happoScreenshot()
  })

  it('renders with icon', () => {
    mount(<TestTabs withIconIndicies={[1, 3]} />)

    cy.get('body').happoScreenshot()
  })

  it('navigates with scroll buttons', () => {
    mount(<TestTabs width='13rem' />)

    cy.get('[data-testid="tab-0"]').should('be.visible')
    cy.get('[data-testid="tab-4"]').should('not.be.visible')
    cy.get('[data-testid="tab-scroll-button-left"]').should('not.exist')
    cy.get('[data-testid="tab-scroll-button-right"]').should('be.visible')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="tab-scroll-button-right"]').click()
    cy.get('[data-testid="tab-0"]').should('not.be.visible')
    cy.get('[data-testid="tab-4"]').should('be.visible')
    cy.get('[data-testid="tab-scroll-button-left"]').should('be.visible')
    cy.get('[data-testid="tab-scroll-button-right"]').should('not.exist')

    cy.get('[data-testid="tab-scroll-button-left"]').click()
    cy.get('[data-testid="tab-0"]').should('be.visible')
    cy.get('[data-testid="tab-4"]').should('not.be.visible')
    cy.get('[data-testid="tab-scroll-button-left"]').should('not.exist')
    cy.get('[data-testid="tab-scroll-button-right"]').should('be.visible')
  })
})
