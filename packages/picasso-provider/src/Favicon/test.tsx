import React from 'react'
import { render as baseRender, waitFor } from '@testing-library/react'

import Picasso from '../Picasso'
import { Favicon } from './Favicon'
import { getIcons } from './icons'

jest.mock('./icons')

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

// Each link has to reach `<head>` carrying its href — React 19 only hoists a
// link whose href exists when the element mounts, and the icons load
// asynchronously.
const expectFaviconLinks = async (environment: string) => {
  await waitFor(() => {
    expect(document.querySelectorAll('head > link')).toHaveLength(3)
  })

  const linkFor = (selector: string) =>
    document.querySelector(`head > link${selector}`)

  expect(linkFor('[rel="apple-touch-icon"][sizes="180x180"]')).toHaveAttribute(
    'href',
    `${environment}-180`
  )
  expect(
    linkFor('[rel="icon"][type="image/png"][sizes="32x32"]')
  ).toHaveAttribute('href', `${environment}-32`)
  expect(
    linkFor('[rel="icon"][type="image/png"][sizes="16x16"]')
  ).toHaveAttribute('href', `${environment}-16`)
}

describe('Favicon', () => {
  // The real icons all resolve to the same file stub under jest, which would
  // make every environment look alike, so the loader answers with hrefs that
  // carry the environment it was asked for. Set per test: the jest config
  // resets mock implementations between tests.
  beforeEach(() => {
    jest.mocked(getIcons).mockImplementation(async environment => ({
      icon16: `${environment}-16`,
      icon32: `${environment}-32`,
      icon180: `${environment}-180`,
    }))
  })

  it('renders the icons of the provider environment', async () => {
    render(<Favicon />)

    await expectFaviconLinks('development')
    expect(getIcons).toHaveBeenCalledWith('development')
  })

  it('renders the icons of the environment prop over the provider one', async () => {
    render(<Favicon environment='staging' />)

    await expectFaviconLinks('staging')
    expect(getIcons).toHaveBeenCalledWith('staging')
  })

  it('renders nothing in a test environment', async () => {
    const { container } = render(<Favicon environment='test' />)
    const picassoRoot = container.firstChild as Element

    expect(picassoRoot.children).toHaveLength(0)
    expect(getIcons).not.toHaveBeenCalled()
  })
})
