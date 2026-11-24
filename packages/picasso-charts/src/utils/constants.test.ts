import { FOCUS_RING } from '@toptal/picasso-shared'

import { SURFACE_FOCUS_RING } from './constants'

describe('SURFACE_FOCUS_RING', () => {
  it('matches the Picasso focus ring', () => {
    expect(SURFACE_FOCUS_RING).toContain(
      `[&>.recharts-surface:focus-visible]:${FOCUS_RING.blue.focused}`
    )
  })
})
