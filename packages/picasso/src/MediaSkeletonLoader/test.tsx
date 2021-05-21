import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import SkeletonLoader from '../SkeletonLoader'
import {
  getAttributes,
  getAvatarAttributes,
  getIconAttributes,
  getImageAttributes
} from './MediaSkeletonLoader'

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

describe('MediaSkeletonLoader', () => {
  it('supports custom classname and style attributes', () => {
    const { getByTestId } = render(
      <SkeletonLoader.Media
        data-testid='loader'
        style={{ color: 'red' }}
        className='toptal-media'
      />
    )

    const loader = getByTestId('loader')

    expect(loader).toHaveAttribute('style', 'color: red;')
    expect(loader).toHaveAttribute('class', 'toptal-media')
  })

  it('renders avatar variants', () => {
    const { getByTestId } = render(
      <>
        <SkeletonLoader.Media
          data-testid='xxsmall-avatar-loader'
          variant='avatar'
          size='xxsmall'
        />
        <SkeletonLoader.Media
          data-testid='default-avatar-loader'
          variant='avatar'
        />
        <SkeletonLoader.Media
          data-testid='small-avatar-loader'
          variant='avatar'
          size='small'
        />
        <SkeletonLoader.Media
          data-testid='medium-avatar-loader'
          variant='avatar'
          size='medium'
        />
        <SkeletonLoader.Media
          data-testid='large-avatar-loader'
          variant='avatar'
          size='large'
        />
      </>
    )

    expect(getByTestId('xxsmall-avatar-loader')).toBeInTheDocument()
    expect(getByTestId('default-avatar-loader')).toBeInTheDocument()
    expect(getByTestId('small-avatar-loader')).toBeInTheDocument()
    expect(getByTestId('medium-avatar-loader')).toBeInTheDocument()
    expect(getByTestId('large-avatar-loader')).toBeInTheDocument()
  })

  it('renders icon variants', () => {
    const { getByTestId } = render(
      <>
        <SkeletonLoader.Media
          data-testid='medium-rect-icon-loader'
          variant='icon'
          size='medium'
        />
        <SkeletonLoader.Media
          data-testid='large-rect-icon-loader'
          variant='icon'
          size='large'
        />
        <SkeletonLoader.Media
          data-testid='medium-circle-icon-loader'
          variant='icon'
          circle
        />
        <SkeletonLoader.Media
          data-testid='large-circle-icon-loader'
          variant='icon'
          circle
          size='large'
        />
      </>
    )

    expect(getByTestId('medium-rect-icon-loader')).toBeInTheDocument()
    expect(getByTestId('large-rect-icon-loader')).toBeInTheDocument()
    expect(getByTestId('medium-circle-icon-loader')).toBeInTheDocument()
    expect(getByTestId('large-circle-icon-loader')).toBeInTheDocument()
  })

  it('renders image variants', () => {
    const { getByTestId } = render(
      <>
        <SkeletonLoader.Media
          data-testid='default-image-loader'
          variant='image'
          width='2rem'
          height='2rem'
        />
        <SkeletonLoader.Media
          data-testid='circle-image-loader'
          circle
          variant='image'
          width='2rem'
          height='2rem'
        />
      </>
    )

    expect(getByTestId('default-image-loader')).toBeInTheDocument()
    expect(getByTestId('circle-image-loader')).toBeInTheDocument()
  })
})
