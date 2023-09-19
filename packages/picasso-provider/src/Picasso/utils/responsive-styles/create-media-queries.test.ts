import type { Theme } from '@material-ui/core'

import { createMediaQueries } from './create-media-queries'

describe('createMediaQueries', () => {
  it('returns media queries with the correct class names and CSS properties', () => {
    const cssProp = 'padding'
    const theme = {
      breakpoints: {
        keys: ['sm', 'md'],
        up: (breakpoint: number) => `@media (min-width: ${breakpoint})`,
      },
    }

    const expectedMediaQueries = {
      '@media (min-width: md)': {
        'md--padding': {
          padding: 'var(--picasso-responsive--md--padding)',
        },
      },
      '@media (min-width: sm)': {
        'sm--padding': {
          padding: 'var(--picasso-responsive--sm--padding)',
        },
      },
    }

    const result = createMediaQueries(cssProp, theme as Theme)

    expect(result).toEqual(expectedMediaQueries)
  })
})
