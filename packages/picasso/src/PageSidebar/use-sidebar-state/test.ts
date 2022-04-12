import { renderHook } from '@testing-library/react-hooks'

import useSidebarState, { Props } from './use-sidebar-state'

const renderUseSidebarState = (props: Props) =>
  renderHook(() => useSidebarState(props))

describe('useSidebarState', () => {
  it('returns state and context variables', () => {
    const { result } = renderUseSidebarState({})

    expect(result.current).toEqual({
      hasSidebar: false,
      setHasSidebar: expect.any(Function),
      expandedItemKey: null,
      setExpandedItemKey: expect.any(Function),
      isCollapsed: false,
      setIsCollapsed: expect.any(Function),
      isHovered: false,
      setIsHovered: expect.any(Function)
    })
  })

  it('returns state and context variables with collapsed initial value', () => {
    const { result } = renderUseSidebarState({ defaultCollapsed: true })

    expect(result.current).toEqual({
      hasSidebar: false,
      setHasSidebar: expect.any(Function),
      expandedItemKey: null,
      setExpandedItemKey: expect.any(Function),
      isCollapsed: true,
      setIsCollapsed: expect.any(Function),
      isHovered: false,
      setIsHovered: expect.any(Function)
    })
  })
})
