import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Loader from './index'

const renderLoader = (children, props = {}) => {
  return render(<Loader {...props}>{children}</Loader>)
}

afterEach(cleanup)

test('props combo', () => {
  const { container } = renderLoader({
    inline: true,
    label: 'Testing',
    size: 'large',
    indeterminate: true
  })

  expect(container).toMatchSnapshot()
})
