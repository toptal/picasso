import React from 'react'
import { cleanup, render, RenderResult } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import Amount, { Props } from './Amount'

const renderAmount = (props: OmitInternalProps<Props>) => {
  const { amount } = props

  return render(<Amount amount={amount} />)
}

afterEach(cleanup)

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
