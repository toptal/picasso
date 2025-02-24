import React, { useState } from 'react'
import { Button, Container, Section } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [expandedSection, setExpandedSection] = useState(0)

  return (
    <>
      <Section
        collapsible
        onToggle={collapsed => setExpandedSection(collapsed ? 1 : 0)}
        variant='bordered'
        title='First section'
        collapsed={expandedSection !== 0}
      >
        <p>First section content</p>
        <Button onClick={() => setExpandedSection(1)}>
          Go to second section
        </Button>
      </Section>
      <Container top={SPACING_4}>
        <Section
          collapsible
          onToggle={collapsed => setExpandedSection(collapsed ? 0 : 1)}
          variant='bordered'
          title='Second section'
          collapsed={expandedSection !== 1}
        >
          <p>Second section content</p>
          <Button onClick={() => setExpandedSection(0)}>
            Go to first section
          </Button>
        </Section>
      </Container>
    </>
  )
}

export default Example
