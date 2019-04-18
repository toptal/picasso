import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Image from './index'

const renderImage = (props: any) => {
  return render(<Image {...props} />)
}

afterEach(cleanup)

describe('Image', () => {
  test('default render', () => {
    const { container } = renderImage({})

    expect(container).toMatchSnapshot()
  })

  test('circular variant render', () => {
    const { container } = renderImage({ variant: 'circular' })

    expect(container).toMatchSnapshot()
  })
})
