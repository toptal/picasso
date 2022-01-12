import { MutableRefObject } from 'react'
import Quill, { EventEmitter, TextChangeHandler } from 'quill'
import { renderHook } from '@testing-library/react-hooks'
import { createEvent, fireEvent } from '@toptal/picasso/test-utils'

import useTextChange from '.'

describe('useTextChange', () => {
  let mockElement: Element

  beforeAll(() => {
    mockElement = document.createElement('div')
    jest.spyOn(mockElement, 'addEventListener')
    jest.spyOn(mockElement, 'removeEventListener')
  })

  it('calls handler on editors text-change event', () => {
    const handler = jest.fn()
    const ref: MutableRefObject<Quill> = {
      current: {
        on: (type: 'text-change', cb: TextChangeHandler) => {
          mockElement.addEventListener(
            type,
            (cb as unknown) as (this: Element, event: Event) => void
          )

          return (ref.current.on as unknown) as EventEmitter
        },
        off: (type: 'text-change', cb: TextChangeHandler) => {
          mockElement.removeEventListener(
            type,
            (cb as unknown) as (this: Element, event: Event) => void
          )
        }
      } as Quill
    }

    renderHook(() => useTextChange({ ref, handler }))

    fireEvent(mockElement, createEvent('text-change', mockElement))

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
