import { getHappoTargets } from './get-happo-targets'

describe('getHappoTargets', () => {
  it('returns correct Happo responsive testing targets', () => {
    expect(getHappoTargets([1000])).toEqual([
      {
        browser: 'chrome',
        name: 'chrome-desktop-width-1000',
        viewport: '1000x1024',
        width: 1000,
      },
    ])
  })
})
