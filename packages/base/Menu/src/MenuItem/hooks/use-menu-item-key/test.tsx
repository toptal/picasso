import { renderHook } from '@testing-library/react-hooks'

import useMenuItemKey from './use-menu-item-key'

describe('useMenuItemKey', () => {
  it('generates stable key', () => {
    const { result, rerender } = renderHook(() => useMenuItemKey())
    const key1 = result.current

    rerender()
    const key2 = result.current

    expect(key1).toBe(key2)
    expect(key1).toBeDefined()
  })
})
