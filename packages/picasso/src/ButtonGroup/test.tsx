import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import ButtonGroup from './ButtonGroup'
import Button from '../Button'

describe('ButtonGroup', () => {
  test('render', () => {
    const { container } = render(
      <ButtonGroup>
        <Button key='1' />
        <Button key='2' active />
        <Button key='3' />
      </ButtonGroup>
    )

    expect(container).toMatchSnapshot()
  })
})
