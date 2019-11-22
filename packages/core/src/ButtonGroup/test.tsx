import React, { ReactNode } from 'react'
import { render, cleanup } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import ButtonGroup from './ButtonGroup'
import Button from '../Button'

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
