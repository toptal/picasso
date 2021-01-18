import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import AccordionSummary from './AccordionSummary'

describe('AccordionSummary', () => {
  it('renders', () => {
    const { container } = render(
      <AccordionSummary>Lorem ipsum</AccordionSummary>
    )

    expect(container).toMatchSnapshot()
  })
})
