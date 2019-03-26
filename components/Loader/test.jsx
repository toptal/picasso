import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Loader from './index'

const renderLoader = (children, props = {}) => {
  return render(<Loader {...props}>{children}</Loader>)
}

afterEach(cleanup)

test('props combo', () => {
  const { container } = renderLoader('Testing', {
    inline: true,
    size: 'large',
    indeterminate: true
  })

  expect(container).toMatchSnapshot()
})
