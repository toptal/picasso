import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Avatar from './index'

const renderAvatar = (props: any) => {
  return render(<Avatar {...props} />)
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
      src: 'http://example.png'
    })

    expect(container).toMatchSnapshot()
  })
})
