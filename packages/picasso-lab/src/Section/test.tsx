import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Section from './Section'

describe('Section', () => {
  it('renders with title, subtitle, actions and content', () => {
    const { container } = render(
      <Section title='Title' subtitle='Subtitle' actions='Actions'>
        Content
      </Section>
    )

    expect(container).toMatchSnapshot()
  })
})
