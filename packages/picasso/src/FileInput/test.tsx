import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FileInput from './FileInput'

const TestFileInput = () => {
  return <FileInput />
}

describe('FileInput', () => {
  it('renders', () => {
    const { container } = render(<TestFileInput />)

    expect(container).toMatchSnapshot()
  })
})
