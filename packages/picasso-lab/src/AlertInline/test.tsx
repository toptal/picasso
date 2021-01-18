import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import AlertInline from './AlertInline'

const renderAlertInline = (children: ReactNode) =>
  render(<AlertInline>{children}</AlertInline>)

describe('Alert', () => {
  it('default render', () => {
    const { container } = renderAlertInline('test example string')

    expect(container).toMatchSnapshot()
  })
})
