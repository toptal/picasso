import { renderHook } from '@testing-library/react'

import { getUseSelectPropsMock } from '../mocks'
import useSearchResetHandler from './use-search-reset-handler'

describe('useSearchResetHandler', () => {
  it('handles reset', () => {
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useSearchResetHandler(props))

    result.current()

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
  })
})
