import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'
import Typography from '../Typography'
import Paper from './index'

const renderPaper = (children: React.ReactNode, props: any) => {
  return render(<Paper {...props}>{children}</Paper>)
}

afterEach(cleanup)

describe('Paper', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderPaper(<Typography>This is Paper</Typography>, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
