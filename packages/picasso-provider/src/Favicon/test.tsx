import React from 'react'
import { render, waitFor } from '@toptal/picasso/test-utils'

import Favicon from './Favicon'

describe('Favicon', () => {
  it('renders', async () => {
    render(<Favicon />)

    await waitFor(() => {
      expect(document.querySelectorAll('head > link')).not.toHaveLength(0)
    })

    expect(document.querySelectorAll('head > link')).toMatchSnapshot()
  })

  it('renders with environment specified', async () => {
    render(<Favicon environment='staging' />)

    await waitFor(() => {
      expect(document.querySelectorAll('head > link')).not.toHaveLength(0)
    })

    expect(document.querySelectorAll('head > link')).toMatchSnapshot()
  })

  it('renders nothing in a test environment', async () => {
    const { container } = render(<Favicon environment='test' />)
    const picassoRoot = container.firstChild as Element

    expect(picassoRoot.children).toHaveLength(0)
  })
})
