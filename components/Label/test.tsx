import React from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Label from './index'
import Picasso from '../Picasso'

const renderLabel = (props = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Label {...props} />
    </Picasso>
  )
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
  let onDelete: () => void
  let api: RenderResult
  const closeIconTestId = 'icon-delete'

  beforeEach(() => {
    onDelete = jest.fn()
    api = renderLabel({ onDelete, closeIconTestId })
  })
  test('should render dismissable label', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should fire onDelete event on dismiss action', () => {
    const { getByTestId } = api
    const deleteIcon = getByTestId(closeIconTestId)

    fireEvent.click(deleteIcon)
    expect(onDelete).toHaveBeenCalled()
  })
})
