import { twMerge } from './twMerge'

describe('twMerge', () => {
  it('merges font size classes correctly', () => {
    expect(twMerge('font-inherit-size text-button-large text-2xs')).toBe(
      'text-2xs'
    )
  })
})
