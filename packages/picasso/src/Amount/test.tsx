import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Amount, { Props } from './Amount'

const renderAmount = (props: OmitInternalProps<Props>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return render(<Amount {...props} />)
}

describe('Amount', () => {
  it('renders', () => {
    const { container } = renderAmount({
      amount: 1500,
      currency: 'EUR',
      color: 'green'
    })

    expect(container).toMatchSnapshot()
  })
})
