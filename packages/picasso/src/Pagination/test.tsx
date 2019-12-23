import React from 'react'
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import Pagination, { Props } from './Pagination'

const renderPagination = (props: OmitInternalProps<Props>) => {
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

test('renders nothing for 1 page', () => {
  const { container } = renderPagination({
    activePage: 1,
    totalPages: 1,
    disabled: true,
    onPageChange: () => {}
  })

  expect(container).toMatchSnapshot()
})

test('renders nothing for 0 pages', () => {
  const { container } = renderPagination({
    activePage: 1,
    totalPages: 0,
    disabled: true,
    onPageChange: () => {}
  })

  expect(container).toMatchSnapshot()
})
