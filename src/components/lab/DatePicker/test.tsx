import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Picasso from '../../Picasso'
import DatePicker from './DatePicker'

afterEach(cleanup)

describe('DatePicker', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <DatePicker onChange={() => {}} />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
