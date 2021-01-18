import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Grid, { Props } from './Grid'

const TestGrid: FunctionComponent<OmitInternalProps<Props>> = () => <Grid />

describe('Grid', () => {
  it('renders', () => {
    const { container } = render(<TestGrid />)

    expect(container).toMatchSnapshot()
  })
})
