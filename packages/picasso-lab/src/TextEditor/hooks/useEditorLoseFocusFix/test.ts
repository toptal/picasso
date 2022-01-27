import { fireEvent, act } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useEditorLoseFocusFix from './useEditorLoseFocusFix'

describe('useEditorLoseFocusFix', () => {
  let mockElement: Element

  beforeAll(() => {
    mockElement = document.createElement('div')
    jest.spyOn(mockElement, 'addEventListener')
    jest.spyOn(mockElement, 'removeEventListener')
  })
  it('triggers callback on mousedown', () => {
    const handler = jest.fn()
    const quill = ({
      getModule: () => ({ container: mockElement })
    } as unknown) as Quill

    renderHook(() => useEditorLoseFocusFix({ quill, handler }))

    act(() => {
      const mouseDownEvent = new MouseEvent('mousedown')

      fireEvent(mockElement, mouseDownEvent)
    })

    expect(handler).toHaveBeenCalled()
  })
})
