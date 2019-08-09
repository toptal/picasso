import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, cleanup, RenderResult } from '@testing-library/react'

import Slider from './Slider'

const renderSlider = (children: ReactNode) => {
  return render(<Slider>{children}</Slider>)
}

afterEach(cleanup)

describe('Slider', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSlider(null)
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
