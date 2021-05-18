import React from 'react'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import FileListItem, { Props } from './FileListItem'

const renderFileListItem = (props: OmitInternalProps<Props>) =>
  render(<FileListItem {...props} />)

describe('FileListItem', () => {
  const file = {
    file: new File(['user-profile-picture.png'], 'user-profile-picture.png'),
    uploading: false,
    progress: 0,
    error: undefined
  }

  it('renders', () => {
    const { container } = renderFileListItem({
      file,
      index: 0,
      onRemove: jest.fn()
    })

    expect(container).toMatchSnapshot()
  })

  it('fires callback on remove', () => {
    const handleRemove = jest.fn()

    const { getByRole } = renderFileListItem({
      file,
      index: 0,
      onRemove: handleRemove
    })

    fireEvent.click(getByRole('button'))

    expect(handleRemove).toHaveBeenCalled()
  })

  describe('when file is uploading', () => {
    it(`renders 'Uploading...' label and progress bar`, () => {
      const { queryByText, queryByTestId } = renderFileListItem({
        file: { ...file, uploading: true, progress: 30 },
        index: 0
      })

      expect(queryByText('Uploading...')).toBeInTheDocument()
      expect(queryByTestId('file-list-item-progressbar')).toBeInTheDocument()
    })

    describe('when error exists', () => {
      it('renders file name and error message', () => {
        const { queryByText, queryByTestId } = renderFileListItem({
          file: {
            ...file,
            uploading: true,
            progress: 30,
            error: 'File is too large'
          },
          index: 0
        })

        expect(queryByText('Uploading...')).not.toBeInTheDocument()
        expect(
          queryByTestId('file-list-item-progressbar')
        ).not.toBeInTheDocument()

        expect(queryByText('user-profile-picture.png')).toBeInTheDocument()
        expect(queryByText('File is too large')).toBeInTheDocument()
      })
    })
  })

  describe('when error exists', () => {
    it('renders file name and error message', () => {
      const { queryByText } = renderFileListItem({
        file: {
          ...file,
          uploading: true,
          progress: 30,
          error: 'File is too large'
        },
        index: 0
      })

      expect(queryByText('user-profile-picture.png')).toBeInTheDocument()
      expect(queryByText('File is too large')).toBeInTheDocument()
    })
  })
})
