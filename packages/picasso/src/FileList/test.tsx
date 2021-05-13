import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import FileList from './'

describe('FileList', () => {
  const file = {
    uploading: false,
    progress: 0,
    error: undefined,
    name: 'user-profile-picture.png'
  }

  it('renders', () => {
    const { container } = render(<FileList files={[file]} />)

    expect(container).toMatchSnapshot()
  })

  describe(`when 'onItemRemove' is provided`, () => {
    it('renders remove button', () => {
      const handleIItemRemove = jest.fn()

      const { getByRole } = render(
        <FileList files={[file]} onItemRemove={handleIItemRemove} />
      )

      fireEvent.click(getByRole('button'))

      expect(handleIItemRemove).toHaveBeenCalled()
    })
  })

  describe('when file is uploading', () => {
    it(`renders 'Uploading...' label and progress bar`, () => {
      const { queryByText, queryByTestId } = render(
        <FileList files={[{ ...file, uploading: true, progress: 30 }]} />
      )

      expect(queryByText('Uploading...')).toBeInTheDocument()
      expect(queryByTestId('file-list-item-progressbar')).toBeInTheDocument()
    })

    describe('when error exists', () => {
      it('renders file name and error message', () => {
        const { queryByText, queryByTestId } = render(
          <FileList
            files={[
              {
                ...file,
                uploading: true,
                progress: 30,
                error: 'File is too large'
              }
            ]}
          />
        )

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
      const { queryByText } = render(
        <FileList
          files={[
            {
              ...file,
              uploading: true,
              progress: 30,
              error: 'File is too large'
            }
          ]}
        />
      )

      expect(queryByText('user-profile-picture.png')).toBeInTheDocument()
      expect(queryByText('File is too large')).toBeInTheDocument()
    })
  })
})
