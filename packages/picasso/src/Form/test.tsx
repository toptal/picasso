import React from 'react'
import { render } from '@testing-library/react'

import Form from './index'

const renderForm = () => {
  return render(<Form />)
}

describe('Form', () => {
  it('renders', () => {
    const { container } = renderForm()

    expect(container).toMatchSnapshot()
  })
})
