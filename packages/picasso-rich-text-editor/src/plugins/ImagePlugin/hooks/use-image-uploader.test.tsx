import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'

import { useImageUploader } from './use-image-uploader'
import type { Props } from './use-image-uploader'

const TestComponent = (props: Props & { imageToUpload: File }) => {
  const { image, upload } = useImageUploader(props)

  return (
    <>
      <button
        onClick={() =>
          upload({ target: { files: [props.imageToUpload] } } as any)
        }
      >
        upload
      </button>
      <div data-testid='error-container'>{image?.error}</div>
    </>
  )
}

describe('useImageUploader', () => {
  describe('when uploaded file exceeds the size limit', () => {
    it('returns file with error', () => {
      const sizeLimitMB = 1
      const { getByText, getByTestId } = render(
        <TestComponent
          maxSize={sizeLimitMB}
          onUpload={() => new Promise(() => {})}
          imageToUpload={
            {
              size: sizeLimitMB * 2 * 1024 * 1024,
            } as File
          }
        />
      )

      const button = getByText('upload')

      fireEvent.click(button)

      expect(getByTestId('error-container')).toHaveTextContent(
        `File size exceeds the ${sizeLimitMB}MB limit.`
      )
    })
  })
})
