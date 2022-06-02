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
    const { container, getByText } = render(
      <TestFileInput buttonLabel='Upload File' />
    )

    expect(container).toMatchSnapshot()
    expect(getByText('Upload File')).toBeInTheDocument()
  })

  it('can render custom button', () => {
    const { container, getByTestId } = render(
      <TestFileInput
        renderButton={({ label, ...props }) => (
          <button data-testid='custom-button' {...props}>
            {label}
          </button>
        )}
      />
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('custom-button')).toBeInTheDocument()
  })
})
