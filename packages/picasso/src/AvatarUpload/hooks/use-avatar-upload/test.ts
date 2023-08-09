import { renderHook } from '@testing-library/react-hooks'

import useAvatarUpload from './use-avatar-upload'

describe('useAvatarUpload', () => {
  describe('when src exist and uploading false', () => {
    it('returns showAvatar as true', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          src: 'src',
          uploading: false,
        })
      )

      expect(result.current.showAvatar).toBeTruthy()
    })
  })

  describe('when src exist and uploading true', () => {
    it('returns showAvatar as false', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          src: 'src',
          uploading: true,
        })
      )

      expect(result.current.showAvatar).toBeFalsy()
    })
  })

  describe('when src does not exist and uploading false', () => {
    it('returns showUploadIcon as true', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          src: undefined,
          uploading: false,
        })
      )

      expect(result.current.showUploadIcon).toBeTruthy()
    })
  })

  describe('when src does not exist and uploading true', () => {
    it('returns showUploadIcon as false', () => {
      const { result } = renderHook(() =>
        useAvatarUpload({
          src: undefined,
          uploading: true,
        })
      )

      expect(result.current.showUploadIcon).toBeFalsy()
    })
  })
})
