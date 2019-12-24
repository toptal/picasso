import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import FileInput, { Props } from './FileInput'

const TestFileInput: FunctionComponent<OmitInternalProps<Props>> = () => (
  <Picasso loadFonts={false}>
    <FileInput />
  </Picasso>
)

describe('FileInput', () => {
  test('default render', () => {
    const { container } = render(<TestFileInput />)

    expect(container).toMatchSnapshot()
  })
})
