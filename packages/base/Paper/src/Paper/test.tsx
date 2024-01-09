import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'

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
  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
