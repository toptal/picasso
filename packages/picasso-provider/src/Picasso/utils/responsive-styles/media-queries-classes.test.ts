import type { Theme } from '@material-ui/core'

import { mediaQueriesClasses } from './media-queries-classes'

describe('mediaQueriesClasses', () => {
  it('returns an object with media queries classes based on the responsive props and theme', () => {
    const responsiveProps = ['margin']
    const theme = {
      breakpoints: {
        keys: ['sm', 'md'],
        up: (breakpoint: number) => `@media (min-width: ${breakpoint})`,
      },
    }

    const expectedMediaQueries = {
      '@media (min-width: md)': {
        'md--margin': {
          margin: 'var(--picasso-responsive--md--margin)',
        },
      },
      '@media (min-width: sm)': {
        'sm--margin': {
          margin: 'var(--picasso-responsive--sm--margin)',
        },
      },
    }

    const result = mediaQueriesClasses(responsiveProps, theme as Theme)

    expect(result).toEqual(expectedMediaQueries)
  })
})
