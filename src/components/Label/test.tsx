import React from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Label from './index'
import Picasso from '../Picasso'

const renderLabel = (children: string, props = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Label {...props}>{children}</Label>
    </Picasso>
  )
}

afterEach(cleanup)

test('renders default variant', () => {
  const { container } = renderLabel('Label')

  expect(container).toMatchSnapshot()
})

test('renders flat variant', () => {
  const { container } = renderLabel('Label', { variant: 'flat' })

  expect(container).toMatchSnapshot()
})

test('renders success variant', () => {
  const { container } = renderLabel('Label', { variant: 'success' })

  expect(container).toMatchSnapshot()
})

test('renders error variant', () => {
  const { container } = renderLabel('Label', { variant: 'error' })

  expect(container).toMatchSnapshot()
})

describe('dismissable label', () => {
  let onDelete: () => void
  let api: RenderResult

  beforeEach(() => {
    onDelete = jest.fn()
    api = renderLabel('Label', { onDelete })
  })
  test('should render dismissable label', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should fire onDelete event on dismiss action', () => {
    const { getByLabelText } = api
    const deleteIcon = getByLabelText('delete icon')

    fireEvent.click(deleteIcon)
    expect(onDelete).toHaveBeenCalled()
  })
})
