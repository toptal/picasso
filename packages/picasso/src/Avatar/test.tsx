import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Avatar, { Props } from './Avatar'

const renderAvatar = (props: OmitInternalProps<Props>) => {
  const { alt, name, src, size } = props

  return render(<Avatar alt={alt} name={name} src={src} size={size} />)
}

describe('Avatar', () => {
  it('renders with initials', () => {
    const { getByText } = renderAvatar({ name: 'Jacqueline Roque' })

    expect(getByText('JR')).toBeVisible()
  })

  it('renders with a long name', () => {
    const { getByText } = renderAvatar({
      name: 'Jacqueline Roque Bailey Armstrong'
    })

    expect(getByText('JRB')).toBeVisible()
  })

  it('renders with an image', () => {
    const { getByAltText } = renderAvatar({
      alt: 'Photo alt text',
      src: 'http://example.png',
      name: 'Jacqueline Roque'
    })

    expect(getByAltText('Photo alt text')).toBeVisible()
  })

  it('renders with logo', () => {
    const { getAllByRole } = renderAvatar({ src: 'foobar', size: 'medium' })

    expect(getAllByRole('img')).toHaveLength(2)
  })

  it('renders without logo', () => {
    const { getAllByRole } = renderAvatar({ src: 'foobar', size: 'small' })

    expect(getAllByRole('img')).toHaveLength(1)
  })

  it('renders with a placeholder icon', () => {
    const { getByTestId } = renderAvatar({})

    expect(getByTestId('photo-placeholder')).toBeVisible()
  })
})
