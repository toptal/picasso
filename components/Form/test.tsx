import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Form from './index'

const renderForm = () => {
  return render(<Form />)
}

afterEach(cleanup)

describe('Form', () => {
  test('default render', () => {
    const { container } = renderForm()

    expect(container).toMatchSnapshot()
  })
})
