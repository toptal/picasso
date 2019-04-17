import React from 'react'
import { render, cleanup } from 'react-testing-library'

import FormHint from './index'

const renderFormHint = (text: string) => {
  return render(<FormHint>{text}</FormHint>)
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
