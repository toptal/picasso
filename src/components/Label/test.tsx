import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import Label, { Props } from './Label'

const renderLabel = (
  children: string,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { onDelete, disabled } = props

  return render(
    <Picasso loadFonts={false}>
      <Label onDelete={onDelete} disabled={disabled}>
        {children}
      </Label>
    </Picasso>
  )
}

afterEach(cleanup)

test('renders default variant', () => {
  const { container } = renderLabel('Label', {})

  expect(container).toMatchSnapshot()
})

describe('dismissable label', () => {
  let onDelete: () => void

  beforeEach(() => {
    onDelete = jest.fn()
  })
  test('should render dismissable label', () => {
    const { container } = renderLabel('Label', { onDelete })

    expect(container).toMatchSnapshot()
  })

  test('should fire onDelete event on dismiss action', () => {
    const { getByLabelText } = renderLabel('Label', { onDelete })
    const deleteIcon = getByLabelText('delete icon')

    fireEvent.click(deleteIcon)
    expect(onDelete).toHaveBeenCalled()
  })
})
