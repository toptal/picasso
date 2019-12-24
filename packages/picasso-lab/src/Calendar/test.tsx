import React from 'react'
import { render } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Calendar from './Calendar'

describe('Calendar', () => {
  test('default render', () => {
    const value = new Date('12-12-2019')

    const { container } = render(
      <Picasso loadFonts={false}>
        <Calendar
          activeMonth={new Date(2019, 1, 1)}
          onChange={() => {}}
          value={value}
        />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
