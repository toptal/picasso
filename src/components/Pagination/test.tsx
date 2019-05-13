import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso, { UserDefinedProps } from '../Picasso'
import Pagination, { Props } from './Pagination'

const renderPagination = (props: UserDefinedProps<Props>) => {
  const { activePage, disabled, onPageChange, totalPages } = props

  return render(
    <Picasso loadFonts={false}>
      <Pagination
        activePage={activePage}
        disabled={disabled}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </Picasso>
  )
}

afterEach(cleanup)

test('renders default', () => {
  const { container } = renderPagination({
    activePage: 5,
    totalPages: 20,
    onPageChange: () => {}
  })

  expect(container).toMatchSnapshot()
})

test('renders disabled', () => {
  const { container } = renderPagination({
    activePage: 5,
    totalPages: 20,
    disabled: true,
    onPageChange: () => {}
  })

  expect(container).toMatchSnapshot()
})
