import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Amount, { Props } from './Amount'

const renderAmount = (props: OmitInternalProps<Props>) => {
  const { amount } = props

  return render(<Amount amount={amount} />)
}

describe('Amount', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderAmount({ amount: 1500 })
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
