import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Avatar, { Props } from './Avatar'

const renderAvatar = (props: OmitInternalProps<Props>) => {
  const { alt, name, src } = props

  return render(<Avatar alt={alt} name={name} src={src} />)
}

describe('Avatar', () => {
  it('renders with initials', () => {
    const { getByText, container } = renderAvatar({ name: 'Jacqueline Roque' })

    expect(getByText('JR')).toBeVisible()
    expect(container).toMatchSnapshot()
  })

  it('renders with a long name', () => {
    const { container, getByText } = renderAvatar({
      name: 'Jacqueline Roque Bailey Armstrong'
    })

    expect(getByText('JRB')).toBeVisible()
    expect(container).toMatchSnapshot()
  })

  it('renders with an image', () => {
    const { container, getByAltText } = renderAvatar({
      alt: 'Photo alt text',
      src: 'http://example.png',
      name: 'Jacqueline Roque'
    })

    expect(getByAltText('Photo alt text')).toBeVisible()
    expect(container).toMatchSnapshot()
  })

  it('renders with a placeholder icon', () => {
    const { container } = renderAvatar({})

    expect(container.querySelector('svg')).toBeVisible()
    expect(container).toMatchSnapshot()
  })
})
