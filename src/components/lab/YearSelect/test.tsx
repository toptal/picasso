import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso from '../../Picasso'
import YearSelect from './YearSelect'

afterEach(cleanup)

describe('YearSelect', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <YearSelect from='2001' to='2005' onChange={() => {}} />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
