import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import InlineAlert from './InlineAlert'

const renderInlineAlert = (children: ReactNode) =>
  render(<InlineAlert>{children}</InlineAlert>)

describe('Alert', () => {
  test('default render', () => {
    const { container } = renderInlineAlert('test example string')

    expect(container).toMatchSnapshot()
  })
})
