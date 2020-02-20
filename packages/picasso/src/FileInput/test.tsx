import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import FileInput, { Props } from './FileInput'

const TestFileInput: FunctionComponent<OmitInternalProps<Props>> = () => (
  <FileInput />
)

describe('FileInput', () => {
  test('default render', () => {
    const { container } = render(<TestFileInput />)

    expect(container).toMatchSnapshot()
  })
})
