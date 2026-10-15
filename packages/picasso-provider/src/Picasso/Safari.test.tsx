import React from 'react'
import { render, screen } from '@testing-library/react'

import Picasso from './Picasso'
import { useIsSafari } from './RootContext'

const SAFARI_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'

const IsSafari = () => <>{String(useIsSafari())}</>

const renderPicasso = () =>
  render(
    <Picasso loadFavicon={false} loadFonts={false} fixViewport={false}>
      <IsSafari />
    </Picasso>
  )

const mockSafari = () => {
  jest.spyOn(navigator, 'vendor', 'get').mockReturnValue('Apple Computer, Inc.')
  jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(SAFARI_USER_AGENT)
}

describe('Safari flag', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-picasso-safari')
  })

  it('stays off outside Safari', () => {
    renderPicasso()

    expect(screen.getByText('false')).toBeInTheDocument()
    expect(document.documentElement).not.toHaveAttribute('data-picasso-safari')
  })

  it('is set on the context and the html element in Safari', () => {
    mockSafari()

    renderPicasso()

    expect(screen.getByText('true')).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-picasso-safari')
  })

  it('stays off without a provider', () => {
    mockSafari()

    render(<IsSafari />)

    expect(screen.getByText('false')).toBeInTheDocument()
  })
})
