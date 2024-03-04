import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Amount'
import { Amount } from './Amount'

const renderAmount = (props: OmitInternalProps<Props>) => {
  return render(<Amount {...props} />)
}

describe('Amount', () => {
  it('renders', () => {
    const { container } = renderAmount({
      amount: 1500,
      currency: 'EUR',
      color: 'green',
    })

    expect(container).toMatchSnapshot()
  })
})
