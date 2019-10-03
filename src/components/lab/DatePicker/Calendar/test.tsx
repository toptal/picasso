import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Picasso from '../../../Picasso'
import Calendar from './Calendar'

afterEach(cleanup)

describe('Calendar', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Calendar onSelect={() => {}} open />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
