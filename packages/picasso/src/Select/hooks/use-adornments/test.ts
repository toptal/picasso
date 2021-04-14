import { renderHook } from '@testing-library/react-hooks'

import useAdornments from './use-adornments'

describe('useAdornments', () => {
  it('returns no adornment', () => {
    const { result } = renderHook(() => useAdornments({ position: 'start' }))

    expect(result.current[0]).toBeNull()
    expect(result.current[0]).toBeNull()
  })

  it('returns start adornment', () => {
    const { result } = renderHook(() =>
      useAdornments({ position: 'start', icon: 'test' })
    )

    expect(result.current[0]).not.toBeNull()
    expect(result.current[1]).toBeNull()

    expect(result.current[0]).toMatchSnapshot()
  })

  it('returns end adornment', () => {
    const { result } = renderHook(() =>
      useAdornments({ position: 'end', icon: 'test' })
    )

    expect(result.current[0]).toBeNull()
    expect(result.current[1]).not.toBeNull()

    expect(result.current[1]).toMatchSnapshot()
  })
})
