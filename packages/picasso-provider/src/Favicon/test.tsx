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
      disableTransitions
    >
      {ui}
    </Picasso>
  )

// The icons resolve through the file mock, so every href is the same stub;
// what matters is that each link reaches `<head>` carrying its href — React 19
// only hoists a link whose href exists when the element mounts.
const expectFaviconLinks = async () => {
  await waitFor(() => {
    expect(document.querySelectorAll('head > link')).toHaveLength(3)
  })

  const linkFor = (selector: string) =>
    document.querySelector(`head > link${selector}`)

  expect(linkFor('[rel="apple-touch-icon"][sizes="180x180"]')).toHaveAttribute(
    'href',
    'test-file-stub'
  )
  expect(
    linkFor('[rel="icon"][type="image/png"][sizes="32x32"]')
  ).toHaveAttribute('href', 'test-file-stub')
  expect(
    linkFor('[rel="icon"][type="image/png"][sizes="16x16"]')
  ).toHaveAttribute('href', 'test-file-stub')
}

describe('Favicon', () => {
  it('renders', async () => {
    render(<Favicon />)

    await expectFaviconLinks()
  })

  it('renders with environment specified', async () => {
    render(<Favicon environment='staging' />)

    await expectFaviconLinks()
  })

  it('renders nothing in a test environment', async () => {
    const { container } = render(<Favicon environment='test' />)
    const picassoRoot = container.firstChild as Element

    expect(picassoRoot.children).toHaveLength(0)
  })
})
