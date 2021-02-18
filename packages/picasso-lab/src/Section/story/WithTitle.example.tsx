import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Section>
      <Section.Title>Title</Section.Title>
      <Section.Content>
        <SkeletonLoader.Typography rows={3} />
      </Section.Content>
    </Section>
  )
}

export default Example
