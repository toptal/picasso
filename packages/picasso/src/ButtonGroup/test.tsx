import React from 'react'
import { render } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import ButtonGroup from './ButtonGroup'
import Button from '../Button'

describe('ButtonGroup', () => {
  test('render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <ButtonGroup>
          <Button key='1' />
          <Button key='2' active />
          <Button key='3' />
        </ButtonGroup>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
