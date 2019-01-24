import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup } from 'react-testing-library'

import Pagination from './index'

const renderPagination = (children, props = {}) => {
  return render(<Pagination {...props}>{children}</Pagination>)
}

afterEach(cleanup)

test('renders default', () => {
  const { container } = renderPagination({
    activePage: 5,
    totalPages: 20
  })

  expect(container).toMatchSnapshot()
})

test('renders disabled', () => {
  const { container } = renderPagination({
    activePage: 5,
    totalPages: 20,
    disabled: true
  })

  expect(container).toMatchSnapshot()
})
