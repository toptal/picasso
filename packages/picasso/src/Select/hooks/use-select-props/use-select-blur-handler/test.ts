import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useSelectBlurHandler from './use-select-blur-handler'
import { isRelatedTargetInsidePopper } from '../../../utils'

const mockedIsRelatedTargetInsidePopper = isRelatedTargetInsidePopper as jest.MockedFunction<
  typeof isRelatedTargetInsidePopper
>

jest.mock('../../../utils', () =>
  Object.assign({}, jest.requireActual('../../../utils'), {
    isRelatedTargetInsidePopper: jest.fn()
  })
)

describe('useSelectBlurHandler', () => {
  beforeEach(() => {
    mockedIsRelatedTargetInsidePopper.mockClear()
  })

  it('resets search input value and closes', () => {
    const props = getUseSelectPropsMock()

    props.selectProps.value = '1'
    props.selectProps.onBlur = jest.fn()
    mockedIsRelatedTargetInsidePopper.mockReturnValue(false)

    const { result } = renderHook(() => useSelectBlurHandler(props))
    const event = new FocusEvent('focus') as any

    result.current(event)

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
    expect(props.selectState.close).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onBlur).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onBlur).toHaveBeenCalledWith(event)
  })

  it('resets search input value and keeps open', () => {
    const props = getUseSelectPropsMock()

    props.selectProps.value = '1'
    props.selectProps.onBlur = jest.fn()
    mockedIsRelatedTargetInsidePopper.mockReturnValue(true)

    const { result } = renderHook(() => useSelectBlurHandler(props))
    const event = new FocusEvent('focus') as any

    result.current(event)

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
    expect(props.selectState.close).toHaveBeenCalledTimes(0)
    expect(props.selectProps.onBlur).toHaveBeenCalledTimes(1)
    expect(props.selectProps.onBlur).toHaveBeenCalledWith(event)
  })
})
