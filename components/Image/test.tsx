import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Image from './index'

const renderImage = (children: React.ReactNode, props: any) => {
  return render(<Image {...props}>{children}</Image>)
}

afterEach(cleanup)

describe('Image', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderImage(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
