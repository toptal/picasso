import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import Avatar, { Props } from './Avatar'

const renderAvatar = (props: OmitInternalProps<Props>) => {
  const { alt, name, src } = props

  return render(
    <Picasso loadFonts={false}>
      <Avatar alt={alt} name={name} src={src} />
    </Picasso>
  )
}

afterEach(cleanup)

describe('Avatar', () => {
  test('avatar with text render', () => {
    const { container } = renderAvatar({ name: 'Jacqueline Roque' })

    expect(container).toMatchSnapshot()
  })

  test('avatar with photo render', () => {
    const { container } = renderAvatar({
      alt: 'Photo alt text',
      src: 'http://example.png',
      name: 'Jacqueline Roque'
    })

    expect(container).toMatchSnapshot()
  })
})
