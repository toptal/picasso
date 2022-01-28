import { renderHook } from '@testing-library/react-hooks'
import { createEvent, fireEvent } from '@toptal/picasso/test-utils'
import Quill from 'quill'

import useOnChangeCallback from './useOnChangeCallback'

describe('useOnChangeCallback', () => {
  it('calls onChange callback', () => {
    const onChange = jest.fn()
    const quill = ({
      on: jest
        .fn()
        .mockImplementation((name, fn) => document.addEventListener(name, fn)),
      off: jest.fn(),
      root: {
        innerHTML: '<p>foobar</p>'
      }
    } as unknown) as Quill

    renderHook(() => useOnChangeCallback({ quill, onChange }))

    fireEvent(
      document,
      createEvent('text-change', document, () => {})
    )

    expect(onChange).toHaveBeenCalledWith('<p>foobar</p>')
  })
})
