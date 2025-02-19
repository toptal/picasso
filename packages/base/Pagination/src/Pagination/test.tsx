import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Pagination'
import { Pagination } from './Pagination'

const renderPagination = (props: OmitInternalProps<Props>) => {
  const {
    activePage,
    disabled,
    onPageChange,
    totalPages,
    nextDisabled,
    variant,
  } = props

  return render(
    <Pagination
      activePage={activePage}
      disabled={disabled}
      onPageChange={onPageChange}
      totalPages={totalPages}
      nextDisabled={nextDisabled}
      variant={variant}
    />
  )
}

describe('Pagination', () => {
  it('renders', () => {
    const { container } = renderPagination({
      activePage: 5,
      totalPages: 20,
      onPageChange: () => {},
    })

    expect(container).toMatchSnapshot()
  })

  it('renders compact without totalPages', () => {
    const { container } = renderPagination({
      activePage: 5,
      variant: 'compact',
      onPageChange: () => {},
    })

    expect(container).toMatchSnapshot()
  })

  it('throws an error when using default variant and no totalPages', () => {
    expect(() =>
      renderPagination({
        activePage: 5,
        totalPages: null,
        onPageChange: () => {},
      })
    ).toThrow('Pagination requires totalPages for non compact variants')
  })

  it('renders disabled', () => {
    const { container } = renderPagination({
      activePage: 5,
      totalPages: 20,
      disabled: true,
      onPageChange: () => {},
    })

    expect(container).toMatchSnapshot()
  })

  it('renders with next disabled', () => {
    const { container } = renderPagination({
      activePage: 5,
      variant: 'compact',
      nextDisabled: true,
      onPageChange: () => {},
    })

    expect(container).toMatchSnapshot()
  })

  it('renders nothing for 1 page', () => {
    const { container } = renderPagination({
      activePage: 1,
      totalPages: 1,
      onPageChange: () => {},
    })

    expect(container).toMatchSnapshot()
  })

  it('renders nothing for 0 pages', () => {
    const { container } = renderPagination({
      activePage: 1,
      totalPages: 0,
      onPageChange: () => {},
    })

    expect(container).toMatchSnapshot()
  })

  it('ignores prev click when on first page', () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({
      activePage: 1,
      totalPages: 5,
      onPageChange,
    })

    fireEvent.click(getByText('Prev'))

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('ignores next click when on last page', () => {
    const onPageChange = jest.fn()
    const { getByText } = renderPagination({
      activePage: 5,
      totalPages: 5,
      onPageChange,
    })

    fireEvent.click(getByText('Next'))

    expect(onPageChange).not.toHaveBeenCalled()
  })
})
