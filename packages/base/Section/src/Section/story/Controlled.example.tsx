import React, { useState } from 'react'
import { Button, Container, Section, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [sectionIsOpened, setSectionIsOpened] = useState(false)

  return (
    <>
      <Container>
        <Button onClick={() => setSectionIsOpened(!sectionIsOpened)}>
          Toggle section
        </Button>
      </Container>
      <Container top={SPACING_4}>
        <Section
          collapsible
          onToggle={collapsed => setSectionIsOpened(collapsed ? false : true)}
          variant='bordered'
          title='First section'
          collapsed={!sectionIsOpened}
        >
          <Typography>First section content</Typography>
          <Button onClick={() => setSectionIsOpened(false)}>
            Close section
          </Button>
        </Section>
      </Container>
    </>
  )
}

export default Example
