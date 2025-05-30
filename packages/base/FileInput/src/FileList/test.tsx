import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './FileList'
import { FileList } from './FileList'

const renderFileList = (props: OmitInternalProps<Props>) =>
  render(<FileList {...props} />)

describe('FileList', () => {
  const file = {
    uploading: false,
    progress: 0,
    error: undefined,
    file: new File(['user-profile-picture.png'], 'user-profile-picture.png'),
  }

  it('renders', () => {
    const { container } = renderFileList({ files: [file] })

    expect(container).toMatchSnapshot()
  })
})
