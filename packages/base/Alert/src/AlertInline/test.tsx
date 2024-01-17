import type { ReactNode } from 'react'
import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import { AlertInline } from './AlertInline'

const renderAlertInline = (children: ReactNode) =>
  render(<AlertInline>{children}</AlertInline>)

describe('Alert', () => {
  it('renders', () => {
    const { container } = renderAlertInline('test example string')

    expect(container).toMatchSnapshot()
  })
})
