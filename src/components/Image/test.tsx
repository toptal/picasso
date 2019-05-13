import React from 'react'
import { render, cleanup } from 'react-testing-library'

import { UserDefinedProps } from '../Picasso'
import Image, { Props } from './Image'

const renderImage = (props: UserDefinedProps<Props>) => {
  const { variant, alt, src } = props

  return render(<Image alt={alt} variant={variant} src={src} />)
}

afterEach(cleanup)

describe('Image', () => {
  test('default render', () => {
    const { container } = renderImage({
      alt: 'Default image',
      src: 'localhost'
    })

    expect(container).toMatchSnapshot()
  })

  test('circular variant render', () => {
    const { container } = renderImage({
      alt: 'Circular image',
      variant: 'circular',
      src: 'localhost'
    })

    expect(container).toMatchSnapshot()
  })
})
