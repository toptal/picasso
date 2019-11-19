import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, cleanup, RenderResult } from '@testing-library/react'

import { OmitInternalProps } from '@toptal/picasso-shared'

import Slider, { Props } from './Slider'

const renderSlider = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { value } = props

  return render(<Slider value={value}>{children}</Slider>)
}

afterEach(cleanup)

describe('Slider', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSlider(null, {})
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('with initial value', () => {
    const { container } = renderSlider(null, { value: 4 })

    expect(container).toMatchSnapshot()
  })
})
