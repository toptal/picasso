import { SPACING_1, SPACING_2, SPACING_4 } from '../../config/spacings'
import { getBreakpointClassNamesToUse } from './get-breakpoint-class-names-to-use'

describe('getBreakpointClassNamesToUse', () => {
  it('returns an array of unique classNames based on the provided props and propSizes', () => {
    const props = ['margin', 'padding']
    const propSizes = {
      margin: SPACING_1,
      padding: {
        sm: SPACING_2,
        md: SPACING_4,
      },
    }
    const expectedClassNames = ['sm--margin', 'md--padding']

    const result = getBreakpointClassNamesToUse(props, propSizes)

    expect(result).toEqual(expectedClassNames)
  })
})
