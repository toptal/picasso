import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import FileList, { Props } from './FileList'

const renderFileList = (props: OmitInternalProps<Props>) =>
  render(<FileList {...props} />)

describe('FileList', () => {
  const file = {
    uploading: false,
    progress: 0,
    error: undefined,
    name: 'user-profile-picture.png'
  }

  it('renders', () => {
    const { container } = renderFileList({ files: [file] })

    expect(container).toMatchSnapshot()
  })
})
