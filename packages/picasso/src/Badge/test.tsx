import React from 'react'
import { render, PicassoConfig, screen } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Badge, { Props } from './Badge'

jest.mock('ap-style-title-case')

const renderBadge = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { content, variant, size } = props

  return render(
    <Badge
      content={content}
      variant={variant}
      size={size}
      data-testid={props['data-testid']}
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
      'data-testid': 'badge-root'
    })

    expect(screen.getByTestId('badge-root')).toBeInTheDocument()
  })
})
