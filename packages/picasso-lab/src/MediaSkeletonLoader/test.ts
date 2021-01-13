import {
  getAttributes,
  getAvatarAttributes,
  getIconAttributes,
  getImageAttributes
} from './MediaSkeletonLoader'

const DEFAULT_WIDTH = 16
const DEFAULT_HEIGHT = 16
const DEFAULT_BORDER_RADIUS = '5px'

describe('getAvatarAttributes', () => {
  it('returns xsmall avatar variant by default', () => {
    expect(getAvatarAttributes({})).toStrictEqual({
      width: 40,
      height: 40,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
  it('supports all avatar size variants', () => {
    expect(getAvatarAttributes({ size: 'xxsmall' })).toStrictEqual({
      width: 32,
      height: 32,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(getAvatarAttributes({ size: 'xsmall' })).toStrictEqual({
      width: 40,
      height: 40,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(getAvatarAttributes({ size: 'small' })).toStrictEqual({
      width: 80,
      height: 80,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(getAvatarAttributes({ size: 'medium' })).toStrictEqual({
      width: 120,
      height: 120,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(getAvatarAttributes({ size: 'large' })).toStrictEqual({
      width: 160,
      height: 160,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
})

describe('getIconAttributes', () => {
  it('supports circular icons', () => {
    expect(getIconAttributes({ circle: false })).toStrictEqual({
      width: 16,
      height: 16,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(getIconAttributes({ circle: true })).toStrictEqual({
      width: 16,
      height: 16,
      borderRadius: '50%'
    })
  })

  it('supports all icons size variants', () => {
    expect(getIconAttributes({ circle: false, size: 'medium' })).toStrictEqual({
      width: 16,
      height: 16,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(getIconAttributes({ circle: false, size: 'large' })).toStrictEqual({
      width: 24,
      height: 24,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
})

describe('getImageAttributes', () => {
  it('supports circular images', () => {
    expect(
      getImageAttributes({ circle: false, width: 1, height: 1 })
    ).toStrictEqual({
      width: 1,
      height: 1,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
    expect(
      getImageAttributes({ circle: true, width: 1, height: 1 })
    ).toStrictEqual({
      width: 1,
      height: 1,
      borderRadius: '50%'
    })
  })

  it('does not convert number widths', () => {
    expect(
      getImageAttributes({ circle: false, width: 24, height: 24 })
    ).toStrictEqual({
      width: 24,
      height: 24,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })

  it('converts rem strings to pixel numbers', () => {
    expect(
      getImageAttributes({ circle: false, width: '1rem', height: '1rem' })
    ).toStrictEqual({
      width: 16,
      height: 16,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
})

describe('getAttributes', () => {
  it('returns default attributes', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getAttributes({})).toStrictEqual({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
  it('returns icon attributes', () => {
    expect(getAttributes({ variant: 'icon' })).toStrictEqual({
      width: 16,
      height: 16,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
  it('returns avatar attributes', () => {
    expect(getAttributes({ variant: 'avatar' })).toStrictEqual({
      width: 40,
      height: 40,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
  it('returns image attributes', () => {
    expect(
      getAttributes({ variant: 'image', width: 24, height: 24 })
    ).toStrictEqual({
      width: 24,
      height: 24,
      borderRadius: DEFAULT_BORDER_RADIUS
    })
  })
})
