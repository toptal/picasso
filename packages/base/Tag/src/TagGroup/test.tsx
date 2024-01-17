import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import { Tag } from '../Tag'
import { TagGroup } from './TagGroup'

const renderTagGroup = () =>
  render(
    <TagGroup>
      <Tag>Angular JS</Tag>
      <Tag>React JS</Tag>
      <Tag>Ember JS</Tag>
      <Tag>Vue JS</Tag>
    </TagGroup>
  )

describe('TagGroup', () => {
  it('should render label group with 4 labels', () => {
    const { container } = renderTagGroup()

    expect(container).toMatchSnapshot()
  })
})
