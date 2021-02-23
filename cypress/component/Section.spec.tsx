import React from 'react'
import { mount } from '@cypress/react'
import { Button, Typography } from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const SectionExample = () => {
  return (
    <TestingPicasso>
      <Section title='Title'>
        <Typography>Title only</Typography>
      </Section>
      <Section title='Title' subtitle='Subtitle'>
        <Typography>Title and subtitle</Typography>
      </Section>
      <Section actions={<Button size='small'>Action</Button>}>
        <Typography>Actions only</Typography>
      </Section>
      <Section title='Title' actions={<Button size='small'>Action</Button>}>
        <Typography>Title and actions</Typography>
      </Section>
      <Section
        title='Title'
        subtitle='Subtitle'
        actions={<Button size='small'>Action</Button>}
      >
        <Typography>Title, subtitle and actions</Typography>
      </Section>
    </TestingPicasso>
  )
}

describe('Section', () => {
  it('renders', () => {
    mount(<SectionExample />)

    // TODO add screenshot when integration with happo works correctly
    // cy.get('body').happoScreenshot()
  })
})
