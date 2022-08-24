import { renderHook } from '@testing-library/react-hooks'

import useAvatarUpload, { Props } from './use-avatar-upload'

const renderUseAvatarUpload = (props: Props) =>
  renderHook(() => useAvatarUpload(props))

describe('useAvatarUpload', () => {
  it('shows dropzone by default', () => {
    const { result } = renderUseAvatarUpload({})
    const { showUploadIcon, showLoader, showAvatar } = result.current

    expect(showUploadIcon).toBe(true)
    expect(showLoader).toBe(false)
    expect(showAvatar).toBe(false)
  })

  describe('when source url exist', () => {
    it('shows avatar', () => {
      const { result } = renderUseAvatarUpload({
        src: 'https://example.com/avatar.jpg',
      })
      const { showUploadIcon, showLoader, showAvatar } = result.current

      expect(showUploadIcon).toBe(false)
      expect(showLoader).toBe(false)
      expect(showAvatar).toBe(true)
    })
  })

  describe('when uploading', () => {
    it('shows loader', () => {
      const { result } = renderUseAvatarUpload({
        uploading: true,
      })
      const { showUploadIcon, showLoader, showAvatar } = result.current

      expect(showUploadIcon).toBe(false)
      expect(showLoader).toBe(true)
      expect(showAvatar).toBe(false)
    })
  })
})
