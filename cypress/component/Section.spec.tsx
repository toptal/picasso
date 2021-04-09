import React from 'react'
import { mount } from '@cypress/react'
import { Button, Typography, Container } from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const SectionExample = () => {
  return (
    <TestingPicasso>
      <Container bottom='xlarge' bordered>
        <Section title='Title'>
          <Typography>Title only</Typography>
        </Section>
      </Container>
      <Container bottom='xlarge' bordered>
        <Section title='Title' subtitle='Subtitle'>
          <Typography>Title and subtitle</Typography>
        </Section>
      </Container>
      <Container bottom='xlarge' bordered>
        <Section actions={<Button size='small'>Action</Button>}>
          <Typography>Actions only</Typography>
        </Section>
      </Container>
      <Container bottom='xlarge' bordered>
        <Section title='Title' actions={<Button size='small'>Action</Button>}>
          <Typography>Title and actions</Typography>
        </Section>
      </Container>
      <Container bordered>
        <Section
          title='Title'
          subtitle='Subtitle'
          actions={<Button size='small'>Action</Button>}
        >
          <Typography>Title, subtitle and actions</Typography>
        </Section>
      </Container>
    </TestingPicasso>
  )
}

describe('Section', () => {
  it('renders', () => {
    mount(<SectionExample />)

    cy.get('body').happoScreenshot()
  })
})
