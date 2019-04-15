import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Pagination from './index'
import Picasso from '../Picasso'

const renderPagination = (props: any) => {
  return render(
    <Picasso loadFonts={false}>
      <Pagination {...props} />
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
