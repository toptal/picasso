import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useResetClickHandler from './use-reset-click-handler'

describe('useResetClickHandler', () => {
  it('closes and handles select', () => {
    const handleSelect = jest.fn()
    const props = { ...getUseSelectPropsMock(), handleSelect }
    const { result } = renderHook(() => useResetClickHandler(props))
    const event = new MouseEvent('click') as any

    event.stopPropagation = jest.fn()

    result.current(event)

    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(props.selectState.close).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })
})
