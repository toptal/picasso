import { renderHook } from '@testing-library/react-hooks'
import { toHtml } from 'hast-util-to-html'

import { ASTType } from '../../types'
import useDefaultValue from './useDefaultValue'

jest.mock('hast-util-to-html', () => ({
  __esModule: true,
  toHtml: jest.fn()
}))

describe('useDefaultValue', () => {
  it('returns empty string without defaultValue', () => {
    const defaultValue = undefined

    const { result } = renderHook(() => useDefaultValue({ defaultValue }))

    expect(result.current.defaultValueInHtml).toBe('')
  })

  it('calls the transform fn once with correct arg', () => {
    const defaultValue: ASTType = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'h3',
          properties: {},
          children: [{ type: 'text', value: 'foobar' }]
        }
      ]
    }

    const { rerender } = renderHook(() => useDefaultValue({ defaultValue }))

    expect(toHtml).toHaveBeenCalledWith(defaultValue)
    rerender()
    expect(toHtml).toHaveBeenCalledTimes(1)
  })
})
