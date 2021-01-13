import { getAvatarAttributes } from './MediaSkeletonLoader'

const BORDER_RADIUS = '5px'

describe('getAvatarAttributes', () => {
  it('returns xsmall avatar variant by default', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getAvatarAttributes()).toBe({
      width: 40,
      height: 40,
      borderRadius: BORDER_RADIUS
    })
  })
})
