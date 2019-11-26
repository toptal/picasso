import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Page from './Page'

const renderPage = (children: React.ReactNode) => {
  return render(
    <Picasso loadFonts={false}>
      <Page>{children}</Page>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Page', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderPage(<div>Test</div>)
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
