import React, { ReactNode } from 'react'
import { render, cleanup } from '@testing-library/react'

import ButtonGroup from './ButtonGroup'
import Button from '../Button'
import Picasso from '../Picasso/Picasso'

const renderButtonGroup = (children: ReactNode) => {
  return render(
    <Picasso loadFonts={false}>
      <ButtonGroup>{children}</ButtonGroup>
    </Picasso>
  )
}

afterEach(cleanup)

describe('ButtonGroup', () => {
  test('render', () => {
    const { container } = renderButtonGroup([
      <Button key='1' />,
      <Button key='2' active />,
      <Button key='3' />
    ])

    expect(container).toMatchSnapshot()
  })
})
