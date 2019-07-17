import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso from '../../Picasso'
import MonthSelect from './MonthSelect'

afterEach(cleanup)

describe('MonthSelect', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <MonthSelect onChange={() => {}} from='1' to='12' />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
