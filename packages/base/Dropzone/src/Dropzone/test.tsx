import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Dropzone'
import Dropzone from './Dropzone'

const renderDropzone = (props: OmitInternalProps<Props>) =>
  render(<Dropzone {...props} />)

describe('Dropzone', () => {
  it('renders', () => {
    const { queryByText, container } = renderDropzone({})

    expect(queryByText('Click or drag to upload')).toBeVisible()
    expect(container).toMatchSnapshot()
  })

  it('shows error', () => {
    const { queryByText } = renderDropzone({
      errorMessages: ['error example'],
      hint: 'hint example',
    })

    expect(queryByText('hint example')).toBeInTheDocument()
    expect(queryByText('error example')).toBeVisible()
  })

  it('renders hint', () => {
    const { queryByText } = renderDropzone({ hint: 'hint example' })

    expect(queryByText('hint example')).toBeVisible()
  })

  describe("when doesn't accept multiple files and there is already a file", () => {
    it('disables the dropzone', () => {
      const { getByTestId } = renderDropzone({
        'data-testid': 'dropzone',
        multiple: false,

        value: [
          {
            uploading: false,
            progress: 0,
            file: new File(['resume.pdf'], 'resume.pdf'),
          },
        ],
      })

      expect(getByTestId('dropzone').className).toContain('disabled')
    })
  })

  describe('when hideContentText is not provided', () => {
    it('render contentText', () => {
      const { queryByText } = renderDropzone({})

      expect(queryByText('Click or drag to upload')).toBeInTheDocument()
    })
  })

  describe('when hideContentText is provided', () => {
    it('render contentText', () => {
      const { queryByText } = renderDropzone({ hideContentText: true })

      expect(queryByText('Click or drag to upload')).not.toBeInTheDocument()
    })
  })
})
