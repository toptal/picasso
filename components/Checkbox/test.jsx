import React from 'react'
/* eslint-disable no-unused-vars */
import { render, fireEvent, cleanup } from 'react-testing-library'

import Checkbox from './index'

const renderCheckbox = (children, props = {}) => {
  return render(<Checkbox {...props}>{children}</Checkbox>)
}

afterEach(cleanup)

describe('', () => {
  let api

  beforeEach(() => {
    api = renderCheckbox()
  })
  test('', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
