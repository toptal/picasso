import { renderHook } from '@testing-library/react-hooks'

import useEditorLoseFocusFixHandler from '.'

describe('useEditorLoseFocusFixHandler', () => {
  it('calls the handler', () => {
    const { result } = renderHook(() => useEditorLoseFocusFixHandler())

    expect(typeof result.current.preventDefaultHandler).toBe('function')
  })
})
