import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Label from './index'

const renderLabel = (props = {}) => {
  return render(<Label {...props} />)
}

afterEach(cleanup)

test('renders default variant', () => {
  const { container } = renderLabel()

  expect(container).toMatchSnapshot()
})

test('renders flat variant', () => {
  const { container } = renderLabel({ variant: 'flat' })

  expect(container).toMatchSnapshot()
})

test('renders success variant', () => {
  const { container } = renderLabel({ variant: 'success' })

  expect(container).toMatchSnapshot()
})

test('renders error variant', () => {
  const { container } = renderLabel({ variant: 'error' })

  expect(container).toMatchSnapshot()
})

describe('dismissable label', () => {
  let onDelete
  let api

  beforeEach(() => {
    onDelete = jest.fn()
    api = renderLabel({ onDelete })
  })
  test('should render dismissable label', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should fire onDelete event on dismiss action', () => {
    const { getByTestId } = api
    const deleteIcon = getByTestId('icon-delete')

    fireEvent.click(deleteIcon)
    expect(onDelete).toHaveBeenCalled()
  })
})
