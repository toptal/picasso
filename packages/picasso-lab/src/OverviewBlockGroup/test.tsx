import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import OverviewBlock from '../OverviewBlock'
import OverviewBlockGroup from './OverviewBlockGroup'

test('should allow to render a single block', () => {
  expect(() => {
    render(
      <OverviewBlockGroup>
        <OverviewBlock value='Value' label='Label' />
      </OverviewBlockGroup>
    )
  }).not.toThrow()
})
