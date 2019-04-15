import React, { ReactNode } from 'react'
import { render, cleanup } from 'react-testing-library'

import Loader from './index'

const renderLoader = (children: ReactNode, props: any = {}) => {
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
