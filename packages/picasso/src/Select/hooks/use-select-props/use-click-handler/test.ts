import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useClickHandler from './use-click-handler'

describe('useClickHandler', () => {
  it('opens and filters options', () => {
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useClickHandler(props))

    result.current()

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
    expect(props.selectState.open).toHaveBeenCalledTimes(1)
  })

  it("does nothing when can't be open", () => {
    const props = getUseSelectPropsMock()

    props.selectState.canOpen = false
    const { result } = renderHook(() => useClickHandler(props))

    result.current()

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(0)
    expect(props.selectState.open).toHaveBeenCalledTimes(0)
  })
})
