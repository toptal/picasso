import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useItemOnClickHandler from './use-item-on-click-handler'

describe('useItemOnClickHandler', () => {
  it('closes and handles select', () => {
    const handleSelect = jest.fn()
    const props = { ...getUseSelectPropsMock(), handleSelect }
    const { result } = renderHook(() => useItemOnClickHandler(props))
    const event = new KeyboardEvent('keydown') as any
    const item = { text: 'One', value: '1' }

    result.current(event, item)

    expect(props.selectState.close).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledWith(event, item)
  })
})
