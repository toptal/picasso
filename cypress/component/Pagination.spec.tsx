import React, { useState } from 'react'
import { mount } from '@cypress/react'
import { Pagination, PaginationProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const PaginationExample = ({
  activePage: defaultActivePage = 1,
  totalPages = 1,
  siblingCount,
  variant
}: Partial<PaginationProps>) => {
  const [activePage, setActivePage] = useState(defaultActivePage)

  return (
    <Pagination
      activePage={activePage}
      onPageChange={setActivePage}
      totalPages={totalPages}
      siblingCount={siblingCount}
      variant={variant}
    />
  )
}

describe('Pagination', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <PaginationExample activePage={3} totalPages={5} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders start ellipsis', () => {
    mount(
      <TestingPicasso>
        <PaginationExample activePage={5} totalPages={5} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders end ellipsis', () => {
    mount(
      <TestingPicasso>
        <PaginationExample activePage={1} totalPages={5} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders both ellipsis', () => {
    mount(
      <TestingPicasso>
        <PaginationExample activePage={5} totalPages={10} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders both ellipsis with custom siblings count', () => {
    mount(
      <TestingPicasso>
        <PaginationExample activePage={5} totalPages={10} siblingCount={3} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders compact', () => {
    mount(
      <TestingPicasso>
        <PaginationExample activePage={5} totalPages={10} variant='compact' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
