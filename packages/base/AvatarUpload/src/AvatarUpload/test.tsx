import React from 'react'
import { render, fireEvent, act } from '@toptal/picasso-test-utils'

import type { Props } from './AvatarUpload'
import { AvatarUpload } from './AvatarUpload'
import type { FileRejection } from './types'

const renderAvatarUpload = (props: Props) => render(<AvatarUpload {...props} />)

const dummyFile = new File(['image-string-content'], 'avatar.jpg', {
  type: 'image/jpg',
})
const dummyFileData = {
  dataTransfer: {
    files: [dummyFile],
    items: [
      {
        kind: 'file',
        type: dummyFile.type,
        getAsFile: () => dummyFile,
      },
    ],
    types: ['Files'],
  },
}

describe('AvatarUpload', () => {
  it('renders', () => {
    const { container } = renderAvatarUpload({})

    expect(container).toMatchSnapshot()
  })

  describe('when a valid image dropped', () => {
    it('calls onDrop and onDropAccepted for the parent with one file', async () => {
      const mockOnDrop = jest.fn()
      const mockOnDropAccepted = jest.fn()

      const { getByTestId } = renderAvatarUpload({
        onDrop: mockOnDrop,
        onDropAccepted: mockOnDropAccepted,
        'data-testid': 'avatar-upload',
      })
      const avatarUpload = getByTestId('avatar-upload')

      await act(() => {
        fireEvent.drop(avatarUpload, dummyFileData)
      })

      expect(mockOnDrop).toHaveBeenCalledWith(
        dummyFile,
        null,
        expect.any(Object)
      )
      expect(mockOnDropAccepted).toHaveBeenCalledWith(
        dummyFile,
        expect.any(Object)
      )

      expect(mockOnDrop).toHaveBeenCalledTimes(1)
      expect(mockOnDropAccepted).toHaveBeenCalledTimes(1)
    })
  })

  describe('when an invalid image dropped', () => {
    it('calls onDrop and onDropRejected for the parent with file rejection', async () => {
      const mockOnDrop = jest.fn()
      const mockOnDropRejected = jest.fn()

      const fileMaxSize = 5

      const { getByTestId } = renderAvatarUpload({
        onDrop: mockOnDrop,
        onDropRejected: mockOnDropRejected,
        'data-testid': 'avatar-upload',
        maxSize: fileMaxSize,
      })

      const avatarUpload = getByTestId('avatar-upload')

      await act(() => {
        fireEvent.drop(avatarUpload, dummyFileData)
      })

      const fileRejection: FileRejection = {
        errors: [
          {
            code: 'file-too-large',
            message: `File is larger than ${fileMaxSize} bytes`,
          },
        ],
        file: dummyFile,
      }

      expect(mockOnDrop).toHaveBeenCalledWith(
        null,
        fileRejection,
        expect.any(Object)
      )
      expect(mockOnDropRejected).toHaveBeenCalledWith(
        fileRejection,
        expect.any(Object)
      )

      expect(mockOnDrop).toHaveBeenCalledTimes(1)
      expect(mockOnDropRejected).toHaveBeenCalledTimes(1)
    })
  })

  describe('when source is exist', () => {
    it('shows avatar with src and hides dropzone', async () => {
      const { getByTestId, queryByTestId } = renderAvatarUpload({
        src: 'some-url',
        'data-testid': 'avatar-upload',
        testIds: {
          avatar: 'avatar',
          dropzoneSvg: 'dropzone-svg',
        },
      })

      const avatar = getByTestId('avatar')
      const dropzoneSvg = queryByTestId('dropzone-svg')

      expect(avatar).toBeVisible()
      expect(dropzoneSvg).not.toBeInTheDocument()
    })
  })
})
