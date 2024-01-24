import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import { FormField } from './index'

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
