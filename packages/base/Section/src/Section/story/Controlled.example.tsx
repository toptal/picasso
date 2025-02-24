import React, { useState } from 'react'
import { Button, Container, Section } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const FIRST_SECTION_ID = 0
const SECOND_SECTION_ID = 1

const Example = () => {
  const [expandedSection, setExpandedSection] = useState(FIRST_SECTION_ID)

  return (
    <>
      <Section
        collapsible
        onToggle={collapsed =>
          setExpandedSection(collapsed ? SECOND_SECTION_ID : FIRST_SECTION_ID)
        }
        variant='bordered'
        title='First section'
        collapsed={expandedSection !== FIRST_SECTION_ID}
      >
        <p>First section content</p>
        <Button onClick={() => setExpandedSection(SECOND_SECTION_ID)}>
          Go to second section
        </Button>
      </Section>
      <Container top={SPACING_4}>
        <Section
          collapsible
          onToggle={collapsed =>
            setExpandedSection(collapsed ? FIRST_SECTION_ID : SECOND_SECTION_ID)
          }
          variant='bordered'
          title='Second section'
          collapsed={expandedSection !== SECOND_SECTION_ID}
        >
          <p>Second section content</p>
          <Button onClick={() => setExpandedSection(FIRST_SECTION_ID)}>
            Go to first section
          </Button>
        </Section>
      </Container>
    </>
  )
}

export default Example
