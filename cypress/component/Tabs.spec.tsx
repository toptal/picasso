import React from 'react'
import { mount } from '@cypress/react'
import { Tabs } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const ScrollButtonsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <TestingPicasso>
      <div style={{ width: '13rem' }}>
        <Tabs value={value} onChange={handleChange} data-testid='tabs'>
          <Tabs.Tab label='Label' data-testid='tab-0' />
          <Tabs.Tab label='Label' data-testid='tab-1' />
          <Tabs.Tab label='Label' data-testid='tab-2' />
          <Tabs.Tab label='Label' data-testid='tab-3' />
          <Tabs.Tab label='Label' data-testid='tab-4' />
        </Tabs>
      </div>
    </TestingPicasso>
  )
}

describe('Tabs', () => {
  it('navigates with scroll buttons', () => {
    mount(<ScrollButtonsExample />)

    cy.get('[data-testid="tab-0"]').should('be.visible')
    cy.get('[data-testid="tab-4"]').should('not.be.visible')
    cy.get('[data-testid="tab-scroll-button-left"]').should('not.exist')
    cy.get('[data-testid="tab-scroll-button-right"]').should('be.visible')

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
