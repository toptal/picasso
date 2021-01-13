import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import AccordionDetails from './AccordionDetails'

describe('AccordionDetails', () => {
  it('renders', () => {
    const { container } = render(
      <AccordionDetails>Lorem ipsum</AccordionDetails>
    )

    expect(container).toMatchSnapshot()
  })
})
