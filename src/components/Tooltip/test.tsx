import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import Tooltip, { Props } from './Tooltip'

const renderTooltip = (
  children: React.ReactNode,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { content, trigger, interactive } = props

  return render(
    <Tooltip content={content} trigger={trigger} interactive={interactive}>
      {children}
    </Tooltip>
  )
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
