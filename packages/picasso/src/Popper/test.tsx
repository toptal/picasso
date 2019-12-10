import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Popper from './Popper'

afterEach(cleanup)

test('default render', () => {
  const { container } = render(
    <Popper open anchorEl={document.body}>
      {'some children'}
    </Popper>
  )

  expect(container).toMatchSnapshot()
})
