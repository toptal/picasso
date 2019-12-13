import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import DatePicker from './DatePicker'

afterEach(cleanup)

describe('DatePicker', () => {
  test('default render', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <Picasso loadFonts={false}>
        <DatePicker value={date} onChange={() => {}} />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('full width', () => {
    const date = new Date('12-12-2019')

    const { container } = render(
      <Picasso loadFonts={false}>
        <DatePicker width='full' value={date} onChange={() => {}} />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
