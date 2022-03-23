import React from 'react';
import { render, screen } from '@toptal/picasso/test-utils'

import Layout from './Layout'

describe('Layout', () => {
  it('renders', () => {
    const children = 'Hello world!'

    render(<Layout title=''>{children}</Layout>)

    expect(screen.queryByText(children)).not.toBeNull()
  })
})
