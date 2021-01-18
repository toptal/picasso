import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import GridItem, { Props } from './GridItem'

const TestGridItem: FunctionComponent<OmitInternalProps<Props>> = () => (
  <GridItem />
)

describe('GridItem', () => {
  it('default render', () => {
    const { container } = render(<TestGridItem />)

    expect(container).toMatchSnapshot()
  })
})
