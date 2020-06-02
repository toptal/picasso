import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Label, { Props } from './Label'

const renderLabel = (
  children: string,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { onDelete, disabled, variant, titleCase } = props

  return render(
    <Label
      onDelete={onDelete}
      disabled={disabled}
      variant={variant}
      titleCase={titleCase}
    >
      {children}
    </Label>
  )
}

test('renders `grey` variant', () => {
  const { container } = renderLabel('Label', {})

  expect(container).toMatchSnapshot()
})

test('renders `white` variant', () => {
  const { container } = renderLabel('Label', { variant: 'white' })

  expect(container).toMatchSnapshot()
})

test('should transform text to title case when titleCase is true', () => {
  const { getByText } = renderLabel('some text with-the-edge case for TEST', {
    titleCase: true
  })

  expect(getByText('Some Text with-the-Edge Case for TEST')).toBeInTheDocument()
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
