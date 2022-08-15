import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import AvatarUpload from './AvatarUpload'

const renderAvatarUpload = () => render(<AvatarUpload />)

describe('AvatarUpload', () => {
  it('renders', () => {
    const { container } = renderAvatarUpload()

    expect(container).toMatchSnapshot()
  })
})
