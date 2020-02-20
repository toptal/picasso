import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import DatePicker from './DatePicker'

describe('DatePicker', () => {
  test('default render', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <DatePicker value={date} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })

  test('full width', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <DatePicker width='full' value={date} onChange={() => {}} />
    )

    expect(container).toMatchSnapshot()
  })
})
