import { describe, expect, it } from '@jest/globals'
import React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Slider'
import { Slider } from './Slider'

const renderSlider = (props: OmitInternalProps<Props>) => {
  const { value } = props

  return render(<Slider value={value} />)
}

describe('Slider', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSlider({})
  })

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  it('with initial value', () => {
    const { container } = renderSlider({ value: 4 })

    expect(container).toMatchSnapshot()
  })
})
