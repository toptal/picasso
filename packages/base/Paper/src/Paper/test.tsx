import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import { Typography } from '@toptal/picasso-typography'

import { Paper } from './'

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

  describe('borderRadius', () => {
    it.each(['none', 'sm', 'md', 'full'] as const)(
      'applies %s border radius class',
      borderRadius => {
        const { container } = render(
          <Paper borderRadius={borderRadius}>Content</Paper>
        )

        expect(container.firstChild).toMatchSnapshot()
      }
    )

    it('applies no border radius class when borderRadius is not set', () => {
      const { container } = render(<Paper>Content</Paper>)

      expect(container.firstChild).not.toHaveClass('rounded-none')
      expect(container.firstChild).not.toHaveClass('rounded-sm')
      expect(container.firstChild).not.toHaveClass('rounded-md')
      expect(container.firstChild).not.toHaveClass('rounded-full')
    })
  })
})
