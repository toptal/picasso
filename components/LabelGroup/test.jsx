import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Label from '../Label'
import Picasso from '../Picasso'

const renderLabelGroup = () => {
  return render(
    <Picasso>
      <Label.Group>
        <Label label='Angular JS' />
        <Label label='React JS' />
        <Label label='Ember JS' />
        <Label label='Vue JS' />
      </Label.Group>
    </Picasso>
  )
}

afterEach(cleanup)

test('should render label group with 4 labels', () => {
  const { container } = renderLabelGroup()

  expect(container).toMatchSnapshot()
})
