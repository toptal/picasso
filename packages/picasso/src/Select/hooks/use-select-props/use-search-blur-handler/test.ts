import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useSearchBlurHandler from './use-search-blur-handler'
import focusRef from '../../../utils/focus-ref'
import isRelatedTargetInsidePopper from '../../../utils/is-related-target-inside-popper'

jest.mock('../../../utils/focus-ref', () => jest.fn())
jest.mock('../../../utils/is-related-target-inside-popper', () => jest.fn())

const mockedIsRelatedTargetInsidePopper = isRelatedTargetInsidePopper as jest.MockedFunction<
  typeof isRelatedTargetInsidePopper
>
const mockedFocusRef = focusRef as jest.MockedFunction<typeof focusRef>

describe('useSearchBlurHandler', () => {
  beforeEach(() => {
    mockedIsRelatedTargetInsidePopper.mockClear()
    mockedFocusRef.mockClear()
  })

  it('focuses select if focus changed to popper', () => {
    mockedIsRelatedTargetInsidePopper.mockReturnValue(true)
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useSearchBlurHandler(props))
    const event = new FocusEvent('focus') as any

    result.current(event)

    expect(mockedFocusRef).toHaveBeenCalledTimes(1)
    expect(mockedFocusRef).toHaveBeenCalledWith(props.selectRef)
  })

  it('closes if focus changed to outside', () => {
    mockedIsRelatedTargetInsidePopper.mockReturnValue(false)
    const props = getUseSelectPropsMock()
    const { result } = renderHook(() => useSearchBlurHandler(props))
    const event = new FocusEvent('focus') as any

    result.current(event)

    expect(props.selectState.close).toHaveBeenCalledTimes(1)
  })
})
