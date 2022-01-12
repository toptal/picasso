import { fireEvent, act } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import useEditorLoseFocusFix from './useEditorLoseFocusFix'
import { EditorRefType } from '../..'

describe('useEditorLoseFocusFix', () => {
  let mockElement: Element

  beforeAll(() => {
    mockElement = document.createElement('div')
    jest.spyOn(mockElement, 'addEventListener')
    jest.spyOn(mockElement, 'removeEventListener')
  })
  it('triggers callback on mousedown', () => {
    const handler = jest.fn()
    const ref = ({
      current: {
        getModule: () => ({ container: mockElement })
      }
    } as unknown) as EditorRefType

    renderHook(() => useEditorLoseFocusFix({ ref, handler }))

    act(() => {
      const mouseDownEvent = new MouseEvent('mousedown')

      fireEvent(mockElement, mouseDownEvent)
    })

    expect(handler).toHaveBeenCalled()
  })
})
