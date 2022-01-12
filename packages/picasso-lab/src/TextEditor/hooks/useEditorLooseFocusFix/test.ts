import { fireEvent, act } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import useEditorLooseFocusFix from './useEditorLooseFocusFix'

describe('useEditorLooseFocusFix', () => {
  let mockElement

  beforeAll(() => {
    mockElement = document.createElement('div')
    jest.spyOn(mockElement, 'addEventListener')
    jest.spyOn(mockElement, 'removeEventListener')
  })
  it('triggers callback on mousedown', () => {
    const handler = jest.fn()
    const ref = {
      current: {
        getModule: () => ({ container: mockElement })
      }
    }

    renderHook(() => useEditorLooseFocusFix({ ref, handler }))

    act(() => {
      const mouseDownEvent = new MouseEvent('mousedown')

      fireEvent(mockElement, mouseDownEvent)
    })

    expect(handler).toHaveBeenCalled()
  })
})
