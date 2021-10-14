import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Dropzone, { Props } from './Dropzone'

const renderDropzone = (props: OmitInternalProps<Props>) =>
  render(<Dropzone {...props} />)

describe('Dropzone', () => {
  it('renders', () => {
    const { queryByText, container } = renderDropzone({})

    expect(queryByText('Click or drag file to upload')).toBeVisible()
    expect(container).toMatchSnapshot()
  })

  it('shows error', () => {
    const { queryByText } = renderDropzone({
      errorMessages: ['error example'],
      hint: 'hint example'
    })

    expect(queryByText('hint example')).not.toBeInTheDocument()
    expect(queryByText('error example')).toBeVisible()
  })

  it('renders hint', () => {
    const { queryByText } = renderDropzone({ hint: 'hint example' })

    expect(queryByText('hint example')).toBeVisible()
  })
})
