import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Avatar'
import { Avatar } from './Avatar'

const renderAvatar = (props: OmitInternalProps<Props>) => {
  const { alt, name, src, size, onEdit, testIds } = props

  return render(
    <Avatar
      alt={alt}
      name={name}
      src={src}
      size={size}
      testIds={testIds}
      onEdit={onEdit}
    />
  )
}

describe('Avatar', () => {
  it('renders with initials', () => {
    const { getByTestId } = renderAvatar({
      name: 'Jacqueline Roque',
      testIds: { text: 'foo' },
    })

    expect(getByTestId('foo')).toHaveTextContent('JR')
  })

  it('renders with a long name', () => {
    const { getByTestId } = renderAvatar({
      name: 'Jacqueline Roque Bailey Armstrong',
      testIds: { text: 'foo' },
    })

    expect(getByTestId('foo')).toHaveTextContent('JRB')
  })

  it('renders with an image', () => {
    const { getByAltText } = renderAvatar({
      alt: 'Photo alt text',
      src: 'http://example.png',
      name: 'Jacqueline Roque',
    })

    expect(getByAltText('Photo alt text')).toBeVisible()
  })

  it('renders with logo', () => {
    const { getAllByRole } = renderAvatar({ src: 'foobar', size: 'medium' })

    expect(getAllByRole('img')).toHaveLength(2)
  })

  it('renders without logo', () => {
    const { getAllByRole } = renderAvatar({ src: 'foobar', size: 'small' })

    expect(getAllByRole('img')).toHaveLength(1)
  })

  it('renders with a placeholder icon', () => {
    const { getByTestId } = renderAvatar({
      testIds: { icon: 'photo-placeholder' },
    })

    expect(getByTestId('photo-placeholder')).toBeVisible()
  })

  describe('when edit state provided', () => {
    it('renders with edit icon and backdrop', () => {
      const mockOnEdit = jest.fn()

      const { getByTestId } = renderAvatar({
        onEdit: mockOnEdit,
        testIds: { editContainer: 'edit-container' },
      })

      const editContainer = getByTestId('edit-container')

      expect(editContainer).toBeVisible()

      fireEvent.click(editContainer)

      expect(mockOnEdit).toHaveBeenCalledTimes(1)
    })
  })
})
