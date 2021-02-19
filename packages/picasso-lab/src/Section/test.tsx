import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Section from './Section'

describe('Section', () => {
  it('renders with title, subtitle, actions and content', () => {
    const { container } = render(
      <Section>
        <Section.Title>Title</Section.Title>
        <Section.Title>Subtitle</Section.Title>
        <Section.Actions>Actions</Section.Actions>
        <Section.Content>Content</Section.Content>
      </Section>
    )

    expect(container).toMatchSnapshot()
  })
})
