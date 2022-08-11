import { renderHook } from '@testing-library/react-hooks'

import useAvatarUpload from './use-avatar-upload'

describe('useAvatarUpload', () => {
  it('renders upload icon by default', () => {
    const { result } = renderHook(() =>
      useAvatarUpload({
        isDragActive: false,
      })
    )
    const { showLoadingIcon, showUploadIcon } = result.current

    expect(showLoadingIcon).toBe(false)
    expect(showUploadIcon).toBe(true)
  })

  describe('when source file exist without active dragging', () => {
    it('shows image avatar', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          src: 'some-src',
          isDragActive: false,
        })
      )

      const { showImageAvatar } = result.current

      expect(showImageAvatar).toBe(true)
    })
  })

  describe('when source file exist while dragging is active', () => {
    it('does not show image avatar', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          src: 'some-src',
          isDragActive: true,
        })
      )

      const { showImageAvatar } = result.current

      expect(showImageAvatar).toBe(false)
    })
  })

  describe('when uploading info provided', () => {
    it('shows loading icon', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          uploading: true,
          isDragActive: false,
        })
      )

      const { showLoadingIcon, showUploadIcon } = result.current

      expect(showLoadingIcon).toBe(true)
      expect(showUploadIcon).toBe(false)
    })
  })
})
