import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useItemOnMouseEnterHandler from './use-item-on-mouse-enter-handler'

describe('useItemOnMouseEnterHandler', () => {
  it('does nothing if entering a highlighted item', () => {
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useItemOnMouseEnterHandler(props))

    result.current(0)

    expect(props.selectState.setHighlightedIndex).toHaveBeenCalledTimes(0)
  })

  it('sets highlighted index', () => {
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useItemOnMouseEnterHandler(props))

    result.current(1)

    expect(props.selectState.setHighlightedIndex).toHaveBeenCalledTimes(1)
  })
})
