import { describe, expect, it, beforeAll, beforeEach } from '@jest/globals'
import React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Slider'
import { Slider } from './Slider'

class IntersectionObserverMock {
  callback: (entries: Partial<IntersectionObserverEntry>[]) => void

  constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
    this.callback = callback
  }

  observe(element: Element) {
    this.callback([{ isIntersecting: true, target: element }])
  }

  unobserve() {}

  disconnect() {}
}

const renderSlider = (props: OmitInternalProps<Props>) => {
  const { value } = props

  return render(<Slider value={value} />)
}

describe('Slider', () => {
  let api: RenderResult

  beforeAll(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    })
  })

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
