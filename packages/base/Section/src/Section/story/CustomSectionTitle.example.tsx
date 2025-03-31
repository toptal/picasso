import React from 'react'
import { Section, Button, Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <>
      <Container bottom={SPACING_4}>
        <Section
          collapsible
          variant='bordered'
          title={
            <Typography variant='heading' size='large'>
              Large collapsible section title
            </Typography>
          }
        >
          <Typography>Section content</Typography>
        </Section>
      </Container>
      <Section
        collapsible
        variant='bordered'
        title={
          <Typography variant='heading' size='large'>
            Large collapsible section title with action
          </Typography>
        }
        actions={
          <Button size='large' variant='secondary'>
            More
          </Button>
        }
      >
        <Typography>Section content</Typography>
      </Section>
    </>
  )
}

export default Example
