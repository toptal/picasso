import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useEscapeKeydownHandler from './use-escape-keydown-handler'

describe('useEscapeKeydownHandler', () => {
  it('closes', () => {
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useEscapeKeydownHandler(props))
    const event = new KeyboardEvent('keydown') as any

    event.preventDefault = jest.fn()

    result.current(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(props.selectState.close).toHaveBeenCalledTimes(1)
  })
})
