import React from 'react'
import { Button } from '@toptal/picasso'
import { Section, SkeletonLoader } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Section>
      <Section.Title>Title</Section.Title>
      <Section.Subtitle>Subtitle</Section.Subtitle>
      <Section.Actions>
        <Button size='small' variant='secondary'>
          Action
        </Button>
      </Section.Actions>
      <Section.Content>
        <SkeletonLoader.Typography rows={3} />
      </Section.Content>
    </Section>
  )
}

export default Example
