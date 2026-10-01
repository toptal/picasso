import React from 'react'
import type { ForwardedRef } from 'react'
import { render } from '@toptal/picasso-test-utils'

import useMultipleForwardRefs from '../use-multiple-forward-refs'

const isReact19OrNewer = Number.parseInt(React.version, 10) >= 19

const Merged = ({ refs }: { refs: ForwardedRef<HTMLDivElement>[] }) => {
  const ref = useMultipleForwardRefs(refs)

  return <div ref={ref} data-testid='node' />
}

const renderMerged = (refs: ForwardedRef<HTMLDivElement>[]) =>
  render(<Merged refs={refs} />)

describe('useMultipleForwardRefs', () => {
  it('passes the node to every ref and clears them when it detaches', () => {
    const objectRef: { current: HTMLDivElement | null } = { current: null }
    const calls: (HTMLDivElement | null)[] = []
    const callbackRef = (node: HTMLDivElement | null) => {
      calls.push(node)
    }

    const { getByTestId, unmount } = renderMerged([objectRef, callbackRef])
    const node = getByTestId('node')

    expect(objectRef.current).toBe(node)

    unmount()

    expect(objectRef.current).toBeNull()
    expect(calls).toEqual([node, null])
  })

  it("runs a callback ref's cleanup where the React major supports it", () => {
    const events: string[] = []
    const cleanupRef = (node: HTMLDivElement | null) => {
      events.push(node ? 'attach' : 'null')

      return () => {
        events.push('cleanup')
      }
    }

    const { unmount } = renderMerged([cleanupRef])

    unmount()

    // React 17 and 18 have no ref cleanups: they call the ref again with `null`
    expect(events).toEqual(
      isReact19OrNewer ? ['attach', 'cleanup'] : ['attach', 'null']
    )
  })
})
