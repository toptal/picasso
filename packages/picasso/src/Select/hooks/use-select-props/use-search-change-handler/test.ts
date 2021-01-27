import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useSearchChangeHandler from './use-search-change-handler'

describe('useSearchChangeHandler', () => {
  it('handles change', () => {
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useSearchChangeHandler(props))

    const event = { target: { value: 'foo' } } as any

    result.current(event)

    expect(props.selectProps.onSearchChange).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onSearchChange).toHaveBeenCalledWith('foo')
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('foo')
  })
})
