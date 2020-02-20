import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Label from '../Label'

const renderLabelGroup = () => {
  return render(
    <Label.Group>
      <Label>Angular JS</Label>
      <Label>React JS</Label>
      <Label>Ember JS</Label>
      <Label>Vue JS</Label>
    </Label.Group>
  )
}

test('should render label group with 4 labels', () => {
  const { container } = renderLabelGroup()

  expect(container).toMatchSnapshot()
})
