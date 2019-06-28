import React, { ReactNode, FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import FileInput, { Props } from './FileInput'

const TestFileInput: FunctionComponent<OmitInternalProps<Props>> = () => (
  <Picasso loadFonts={false}>
    <FileInput />
  </Picasso>
)

afterEach(cleanup)

describe('FileInput', () => {
  test('default render', () => {
    const { container } = render(<TestFileInput />)

    expect(container).toMatchSnapshot()
  })
})
