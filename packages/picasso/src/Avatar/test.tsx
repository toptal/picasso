import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Avatar, { Props } from './Avatar'

const renderAvatar = (props: OmitInternalProps<Props>) => {
  const { alt, name, src } = props

  return render(<Avatar alt={alt} name={name} src={src} />)
}

describe('Avatar', () => {
  it('avatar with text render', () => {
    const { container } = renderAvatar({ name: 'Jacqueline Roque' })

    expect(container).toMatchSnapshot()
  })

  it('Avatar with long text names', () => {
    const { container } = renderAvatar({
      name: 'Jacqueline Roque Bailey Armstrong'
    })

    expect(container).toMatchSnapshot()
  })

  it('avatar with photo render', () => {
    const { container } = renderAvatar({
      alt: 'Photo alt text',
      src: 'http://example.png',
      name: 'Jacqueline Roque'
    })

    expect(container).toMatchSnapshot()
  })
})
