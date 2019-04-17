import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Label from '../Label'
import Picasso from '../Picasso'

const renderLabelGroup = () => {
  return render(
    <Picasso loadFonts={false}>
      <Label.Group>
        <Label>Angular JS</Label>
        <Label>React JS</Label>
        <Label>Ember JS</Label>
        <Label>Vue JS</Label>
      </Label.Group>
    </Picasso>
  )
}

afterEach(cleanup)

test('should render label group with 4 labels', () => {
  const { container } = renderLabelGroup()

  expect(container).toMatchSnapshot()
})
