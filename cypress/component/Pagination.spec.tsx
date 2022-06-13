import React, { useState } from 'react'
import { Pagination, PaginationProps } from '@toptal/picasso'

const PaginationExample = ({
  activePage: defaultActivePage = 1,
  totalPages = 1,
  siblingCount,
  variant,
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
    cy.mount(<PaginationExample activePage={3} totalPages={5} />)
    cy.get('body').happoScreenshot()
  })

  it('renders start ellipsis', () => {
    cy.mount(<PaginationExample activePage={5} totalPages={5} />)
    cy.get('body').happoScreenshot()
  })

  it('renders end ellipsis', () => {
    cy.mount(<PaginationExample activePage={1} totalPages={5} />)
    cy.get('body').happoScreenshot()
  })

  it('renders both ellipsis', () => {
    cy.mount(<PaginationExample activePage={5} totalPages={10} />)
    cy.get('body').happoScreenshot()
  })

  it('renders both ellipsis with custom siblings count', () => {
    cy.mount(
      <PaginationExample activePage={5} totalPages={10} siblingCount={3} />
    )
    cy.get('body').happoScreenshot()
  })

  it('renders compact', () => {
    cy.mount(
      <PaginationExample activePage={5} totalPages={10} variant='compact' />
    )
    cy.get('body').happoScreenshot()
  })
})
