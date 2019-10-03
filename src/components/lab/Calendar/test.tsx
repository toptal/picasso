import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Picasso from '../../Picasso'
import Calendar from './Calendar'

afterEach(cleanup)

describe('Calendar', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Calendar activeMonth={new Date(2019, 1, 1)} onSelect={() => {}} open />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
