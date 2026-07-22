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

  it('closes when open', () => {
    const props = getUseSelectPropsMock()

    props.selectState.canOpen = false
    props.selectState.isOpen = true
    const { result } = renderHook(() => useClickHandler(props))

    result.current()

    expect(props.selectState.close).toHaveBeenCalledTimes(1)
  })

  it("does nothing when can't be open and not open", () => {
    const props = getUseSelectPropsMock()

    props.selectState.canOpen = false
    props.selectState.isOpen = false
    const { result } = renderHook(() => useClickHandler(props))

    result.current()

    expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(0)
    expect(props.selectState.open).toHaveBeenCalledTimes(0)
  })

  describe('when the click is synthesized by an associated label activation', () => {
    const getLabelActivationClickEvent = ({
      detail,
      clientX,
      clientY,
    }: Pick<React.MouseEvent, 'detail' | 'clientX' | 'clientY'>) =>
      ({
        detail,
        clientX,
        clientY,
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 0,
            top: 100,
            right: 200,
            bottom: 132,
          }),
        },
      } as unknown as React.MouseEvent)

    it('does not open when the click originates outside the select root', () => {
      const props = getUseSelectPropsMock()
      const { result } = renderHook(() => useClickHandler(props))

      // label-forwarded activation click: detail 0, label coordinates
      result.current(
        getLabelActivationClickEvent({ detail: 0, clientX: 20, clientY: 90 })
      )

      expect(props.selectState.open).toHaveBeenCalledTimes(0)
      expect(props.selectState.setFilterOptionsValue).toHaveBeenCalledTimes(0)
    })

    it('opens when a detail-0 click points inside the select root', () => {
      const props = getUseSelectPropsMock()
      const { result } = renderHook(() => useClickHandler(props))

      // assistive technology clicks report element-centered coordinates
      result.current(
        getLabelActivationClickEvent({ detail: 0, clientX: 100, clientY: 116 })
      )

      expect(props.selectState.open).toHaveBeenCalledTimes(1)
    })

    it('opens on a real pointer click regardless of coordinates', () => {
      const props = getUseSelectPropsMock()
      const { result } = renderHook(() => useClickHandler(props))

      result.current(
        getLabelActivationClickEvent({ detail: 1, clientX: 20, clientY: 90 })
      )

      expect(props.selectState.open).toHaveBeenCalledTimes(1)
    })
  })
})
