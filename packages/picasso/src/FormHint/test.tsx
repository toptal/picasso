import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import FormHint from './index'

const renderFormHint = (text: string) => {
  return render(
    <Picasso loadFonts={false}>
      <FormHint>{text}</FormHint>
    </Picasso>
  )
}

afterEach(cleanup)

describe('FormHint', () => {
  test('default render', () => {
    const { container } = renderFormHint(
      'Picasso was born on October 25, 1881 in the city of Malaga, Spain'
    )

    expect(container).toMatchSnapshot()
  })
})
