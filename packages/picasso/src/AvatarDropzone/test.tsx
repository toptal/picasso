import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import AvatarDropzone, { Props } from './AvatarDropzone'

const renderAvatarDropzone = (props: OmitInternalProps<Props>) => {
  return render(
    <AvatarDropzone
      {...props}
      testIds={{
        imageAvatar: 'image-avatar',
        loader: 'loader',
        warningIcon: 'warning-icon',
      }}
    />
  )
}

describe('AvatarDropzone', () => {
  it('renders', () => {
    const { container } = renderAvatarDropzone({})

    expect(container).toMatchSnapshot()
  })

  describe('when source file URL provided', () => {
    it('renders image in background', () => {
      const { container, getByTestId } = renderAvatarDropzone({
        alt: 'Photo alt text',
        src: 'http://example.png',
      })

      const imageAvatar = getByTestId('image-avatar')

      expect(imageAvatar).toBeVisible()
      expect(container).toMatchSnapshot()
    })
  })

  describe('when warning message provided', () => {
    it('renders image in background', () => {
      const { container, getByTestId } = renderAvatarDropzone({
        warningMessage: 'File is too big',
      })

      const warningIcon = getByTestId('warning-icon')

      expect(warningIcon).toBeVisible()
      expect(container).toMatchSnapshot()
    })
  })

  describe('when uploading state provided', () => {
    it('renders loader on top of component', () => {
      const { container, getByTestId } = renderAvatarDropzone({
        uploading: true,
      })

      const loader = getByTestId('loader')

      expect(loader).toBeVisible()
      expect(container).toMatchSnapshot()
    })
  })
})
