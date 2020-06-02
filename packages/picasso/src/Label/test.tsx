import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Label, { Props } from './Label'

const renderLabel = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  titleCase?: boolean
) => {
  const { onDelete, disabled, variant } = props

  return render(
    <Label onDelete={onDelete} disabled={disabled} variant={variant}>
      {children}
    </Label>,
    undefined,
    titleCase
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
  const { getByText } = renderLabel(
    'some text with-the-edge case for TEST',
    {},
    true
  )

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
