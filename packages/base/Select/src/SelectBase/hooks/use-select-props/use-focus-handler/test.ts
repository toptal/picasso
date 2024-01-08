import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useFocusHandler from './use-focus-handler'

describe('useFocusHandler', () => {
  it('resets search value when closed and focused', () => {
    const props = getUseSelectPropsMock()

    const { result } = renderHook(() => useFocusHandler(props))

    result.current()

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
  })

  it('does nothing when open', () => {
    const props = getUseSelectPropsMock()

    props.selectState.isOpen = true

    const { result } = renderHook(() => useFocusHandler(props))

    result.current()

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(0)
  })
})
