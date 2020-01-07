import React from 'react'
import { render } from '@testing-library/react'

import NumberInput from './NumberInput'

test('NumberInput', () => {
  const { container } = render(
    <NumberInput step={5} max={100} min={-100} value={10} onChange={() => {}} />
  )

  expect(container).toMatchSnapshot()
})
