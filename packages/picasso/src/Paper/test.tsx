import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Typography from '../Typography'
import Paper from './'

const renderPaper = (children: React.ReactNode) => {
  return render(<Paper>{children}</Paper>)
}

describe('Paper', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderPaper(<Typography>This is Paper</Typography>)
  })
  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
