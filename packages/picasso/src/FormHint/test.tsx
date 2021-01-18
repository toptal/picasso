import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FormHint from './index'

const renderFormHint = (text: string) => {
  return render(<FormHint>{text}</FormHint>)
}

describe('FormHint', () => {
  it('renders', () => {
    const { container } = renderFormHint(
      'Picasso was born on October 25, 1881 in the city of Malaga, Spain'
    )

    expect(container).toMatchSnapshot()
  })
})
