import React from 'react'
import { render } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Image, { Props } from './Image'

const renderImage = (props: OmitInternalProps<Props>) => {
  const { variant, alt, src } = props

  return render(<Image alt={alt} variant={variant} src={src} />)
}

describe('Image', () => {
  it('default render', () => {
    const { container } = renderImage({
      alt: 'Default image',
      src: 'localhost'
    })

    expect(container).toMatchSnapshot()
  })

  it('circular variant render', () => {
    const { container } = renderImage({
      alt: 'Circular image',
      variant: 'circular',
      src: 'localhost'
    })

    expect(container).toMatchSnapshot()
  })
})
