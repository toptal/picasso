import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import Picasso from '@toptal/picasso-provider'

import { Page } from './Page'

const renderPage = (children: React.ReactNode) => {
  return render(<Page>{children}</Page>)
}

describe('Page', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderPage(<div>Test</div>)
  })
  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  it('does not constrain min-width by default', () => {
    const { getByTestId } = render(<Page data-testid='page'>Test</Page>)

    expect(getByTestId('page')).not.toHaveClass('min-w-[768px]')
  })

  it('constrains min-width when the provider disables responsive layout', () => {
    const { getByTestId } = render(
      <Picasso
        loadFavicon={false}
        loadFonts={false}
        fixViewport={false}
        disableHelmet
        responsive={false}
      >
        <Page data-testid='page'>Test</Page>
      </Picasso>
    )

    expect(getByTestId('page')).toHaveClass('min-w-[768px]')
  })
})
