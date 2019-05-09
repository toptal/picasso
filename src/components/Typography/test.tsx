import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Typography from './index'
import Picasso from '../index'

const renderTypography = (children: React.ReactNode, props: any) => {
  const { align, weight } = props

  return render(
    <Picasso loadFonts={false}>
      <Typography align={align} weight={weight}>
        {children}
      </Typography>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Typography', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTypography('Hello world!', {
      weight: 'bold',
      align: 'center'
    })
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
