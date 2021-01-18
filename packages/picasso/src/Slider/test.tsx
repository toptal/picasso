import React, { ReactNode } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Slider, { Props } from './Slider'

const renderSlider = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { value } = props

  return render(<Slider value={value}>{children}</Slider>)
}

describe('Slider', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSlider(null, {})
  })

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  it('with initial value', () => {
    const { container } = renderSlider(null, { value: 4 })

    expect(container).toMatchSnapshot()
  })
})
