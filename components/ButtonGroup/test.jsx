import React from 'react'
import { render, cleanup } from 'react-testing-library'

import ButtonGroup from './index'

const renderButtonGroup = (children, props = {}) => {
  return render(<ButtonGroup {...props}>{children}</ButtonGroup>)
}

afterEach(cleanup)

describe('ButtonGroup', () => {
  test('render', () => {
    const { container } = renderButtonGroup([
      <div key='1' />,
      <div key='2' />,
      <div key='3' />
    ])

    expect(container).toMatchSnapshot()
  })
})
