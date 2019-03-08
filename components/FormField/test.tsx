import React from 'react'
import { render, cleanup } from 'react-testing-library'

import FormField from './index'

const renderFormField = () => {
  return render(<FormField />)
}

afterEach(cleanup)

describe('FormField', () => {
  test('default render', () => {
    const { container } = renderFormField()

    expect(container).toMatchSnapshot()
  })
})
