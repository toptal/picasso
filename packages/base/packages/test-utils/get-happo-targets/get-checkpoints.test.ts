import { getCheckpoints } from './get-checkpoints'

jest.mock('@toptal/picasso-provider', () => ({
  PicassoBreakpoints: {
    breakpoints: {
      values: {
        first: 0,
        second: 100,
        third: 200,
      },
    },
  },
}))

describe('getCheckpoints', () => {
  it('returns correct checkpoints (skips first breakpoint and generates two checkpoints for the last breakpoint)', () => {
    expect(getCheckpoints()).toEqual([99, 199, 201])
  })
})
