import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'

import Page from './Page'

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
})
