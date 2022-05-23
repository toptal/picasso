import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FileInput from './FileInput'
import { FileInputProps } from '.'

const TestFileInput = (props: FileInputProps = {}) => {
  return <FileInput {...props} />
}

describe('FileInput', () => {
  it('renders', () => {
    const { container } = render(<TestFileInput />)

    expect(container).toMatchSnapshot()
  })

  it('can change label', () => {
    const { container } = render(<TestFileInput buttonLabel='Upload File' />)

    expect(container).toMatchSnapshot()
  })
})
