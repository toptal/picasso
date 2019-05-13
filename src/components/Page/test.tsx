import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Picasso from '../Picasso'
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
