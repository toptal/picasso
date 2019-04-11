import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Stepper from './index'

const renderStepper = (children: React.ReactNode, props: any) => {
  return render(<Stepper {...props}>{children}</Stepper>)
}

afterEach(cleanup)

describe('Stepper', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderStepper(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
