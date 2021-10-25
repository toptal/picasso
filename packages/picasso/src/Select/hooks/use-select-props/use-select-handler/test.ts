import { renderHook } from '@testing-library/react-hooks'

import { getUseSelectPropsMock } from '../mocks'
import useSelectHandler from './use-select-handler'
import focusRef from '../../../utils/focus-ref'

const mockedFocusRef = focusRef as jest.MockedFunction<typeof focusRef>

jest.mock('../../../utils/focus-ref', () => jest.fn())

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

describe('useSelectHandler', () => {
  beforeEach(() => {
    mockedFocusRef.mockClear()
  })

  describe('single mode', () => {
    it('selects option', () => {
      const props = getUseSelectPropsMock()

      props.selectProps.options = OPTIONS
      props.selectProps.onChange = jest.fn()

      const { result } = renderHook(() => useSelectHandler(props))
      const event = { persist: jest.fn() } as any

      result.current(event, OPTIONS[1])

      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
      expect(props.selectState.setValue).toHaveBeenCalledWith(OPTIONS[1].value)
      expect(props.selectProps.onChange).toHaveBeenCalledWith({
        ...event,
        target: { name: undefined, value: OPTIONS[1].value }
      })
      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
      expect(focusRef).toHaveBeenCalledWith(props.selectRef)
    })

    it('resets value', () => {
      const props = getUseSelectPropsMock()

      props.selectProps.options = OPTIONS
      props.selectProps.value = '1'
      props.selectProps.onChange = jest.fn()

      const { result } = renderHook(() => useSelectHandler(props))
      const event = { persist: jest.fn() } as any

      result.current(event, null)

      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
      expect(props.selectState.setValue).toHaveBeenCalledWith('')
      expect(props.selectProps.onChange).toHaveBeenCalledWith({
        ...event,
        target: {
          name: undefined,
          value: ''
        }
      })
      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
      expect(focusRef).toHaveBeenCalledWith(props.selectRef)
    })
  })

  describe('multiple mode', () => {
    it('selects option', () => {
      const props = getUseSelectPropsMock()

      props.selectProps.options = OPTIONS
      props.selectProps.multiple = true
      props.selectProps.onChange = jest.fn()

      const { result } = renderHook(() => useSelectHandler(props))
      const event = { persist: jest.fn() } as any

      result.current(event, OPTIONS[1])

      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
      expect(props.selectState.setValue).toHaveBeenCalledWith([
        OPTIONS[1].value
      ])
      expect(props.selectProps.onChange).toHaveBeenCalledWith({
        ...event,
        target: {
          name: undefined,
          value: [OPTIONS[1].value]
        }
      })
      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
      expect(focusRef).toHaveBeenCalledWith(props.selectRef)
    })

    it('resets value', () => {
      const props = getUseSelectPropsMock()

      props.selectProps.options = OPTIONS
      props.selectProps.value = ['1']
      props.selectProps.multiple = true
      props.selectProps.onChange = jest.fn()

      const { result } = renderHook(() => useSelectHandler(props))
      const event = { persist: jest.fn() } as any

      result.current(event, OPTIONS[0])

      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(1)
      expect(props.selectState.setValue).toHaveBeenCalledWith([])
      expect(props.selectProps.onChange).toHaveBeenCalledWith({
        ...event,
        target: {
          name: undefined,
          value: []
        }
      })
      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledWith('')
      expect(focusRef).toHaveBeenCalledWith(props.selectRef)
    })
  })
})
