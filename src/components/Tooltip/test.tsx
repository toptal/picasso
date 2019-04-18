import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Tooltip from './index'

const renderTooltip = (children: React.ReactNode, props: any) => {
  return render(<Tooltip {...props}>{children}</Tooltip>)
}

afterEach(cleanup)

describe('Tooltip', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTooltip(<span>Test</span>, {
      content: 'Content goes here...',
      trigger: 'click',
      interactive: true
    })
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
