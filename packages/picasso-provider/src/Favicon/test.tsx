import React from 'react'
import { render as baseRender, waitFor } from '@testing-library/react'

import Picasso from '../Picasso'
import { Favicon } from './Favicon'

const render: typeof baseRender = ui =>
  baseRender(
    <Picasso
      loadFavicon={false}
      loadFonts={false}
      fixViewport={false}
      preventPageWidthChangeOnScrollbar={false}
      disableTransitions
    >
      {ui}
    </Picasso>
  )

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
