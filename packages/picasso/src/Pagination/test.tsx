import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Pagination, { Props } from './Pagination'

const renderPagination = (props: OmitInternalProps<Props>) => {
  const { activePage, disabled, onPageChange, totalPages } = props

  return render(
    <Pagination
      activePage={activePage}
      disabled={disabled}
      onPageChange={onPageChange}
      totalPages={totalPages}
    />
  )
}

describe('Pagination', () => {
  it('renders', () => {
    const { container } = renderPagination({
      activePage: 5,
      totalPages: 20,
      onPageChange: () => {}
    })

    expect(container).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const { container } = renderPagination({
      activePage: 5,
      totalPages: 20,
      disabled: true,
      onPageChange: () => {}
    })

    expect(container).toMatchSnapshot()
  })

  it('renders nothing for 1 page', () => {
    const { container } = renderPagination({
      activePage: 1,
      totalPages: 1,
      onPageChange: () => {}
    })

    expect(container).toMatchSnapshot()
  })

  it('renders nothing for 0 pages', () => {
    const { container } = renderPagination({
      activePage: 1,
      totalPages: 0,
      onPageChange: () => {}
    })

    expect(container).toMatchSnapshot()
  })

  it('ignores prev click when on first page', () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({
      activePage: 1,
      totalPages: 5,
      onPageChange
    })

    fireEvent.click(getByText('Prev'))

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('ignores next click when on last page', () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({
      activePage: 5,
      totalPages: 5,
      onPageChange
    })

    fireEvent.click(getByText('Next'))

    expect(onPageChange).not.toHaveBeenCalled()
  })
})
