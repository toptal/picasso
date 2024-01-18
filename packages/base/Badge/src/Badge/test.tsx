import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render, screen } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Badge'
import Badge from './Badge'

jest.mock('ap-style-title-case')

const renderBadge = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { content, variant, size, max } = props

  return render(
    <Badge
      content={content}
      variant={variant}
      size={size}
      data-testid={props['data-testid']}
      max={max}
    />,
    undefined,
    picassoConfig
  )
}

describe('Badge', () => {
  it('renders', () => {
    const { container } = renderBadge({ content: 5 })

    expect(container).toMatchSnapshot()
  })

  it('renders in red variant', () => {
    const { container } = renderBadge({ content: 5, variant: 'red' })

    expect(container).toMatchSnapshot()
  })

  it('should transform content when value is more than 10 for small size', () => {
    const { getByText } = renderBadge({ content: 10, size: 'small' })

    expect(getByText('9+')).toBeVisible()
  })

  it('should not transform content when value is les than 10 for small size', () => {
    const { getByText } = renderBadge({ content: 9, size: 'small' })

    expect(getByText('9')).toBeVisible()
  })

  it('should transform content when value is more than 100 for medium size', () => {
    const { getByText } = renderBadge({ content: 100, size: 'medium' })

    expect(getByText('99+')).toBeVisible()
  })

  it('should not transform content when value is more than 100 for medium size', () => {
    const { getByText } = renderBadge({ content: 99, size: 'medium' })

    expect(getByText('99')).toBeVisible()
  })

  it('should render data-testid', () => {
    renderBadge({
      content: 5,
      'data-testid': 'badge-root',
    })

    expect(screen.getByTestId('badge-root')).toBeInTheDocument()
  })

  describe('when max is set', () => {
    it('should trim number with custom max value', () => {
      const { getByText } = renderBadge({
        content: 9999,
        max: 999,
        size: 'large',
      })

      expect(getByText('999+')).toBeVisible()
    })

    it('should not trim when content is lower than max value', () => {
      const { getByText } = renderBadge({
        content: 150,
        max: 999,
        size: 'large',
      })

      expect(getByText('150')).toBeVisible()
    })

    it('should show the badge if the content is 0', () => {
      const { getByText } = renderBadge({
        content: 0,
      })

      expect(getByText('0')).toBeVisible()
    })
  })
})
