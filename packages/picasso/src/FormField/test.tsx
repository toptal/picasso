import React from 'react'
import { render } from '@testing-library/react'

import FormField from './index'

const renderFormField = () => {
  return render(
    <FormField>
      <input />
    </FormField>
  )
}

describe('FormField', () => {
  it('renders', () => {
    const { container } = renderFormField()

    expect(container).toMatchSnapshot()
  })
})
