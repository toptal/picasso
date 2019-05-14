import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'
import Typography from '../Typography'
import Paper from './index'
import Picasso from '../index'

const renderPaper = (children: React.ReactNode) => {
  return render(
    <Picasso loadFonts={false}>
      <Paper>{children}</Paper>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Paper', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderPaper(<Typography>This is Paper</Typography>)
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
