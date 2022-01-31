import React from 'react'
import { EmptyState, Container, Image } from '@toptal/picasso'

const DefaultExample = () => (
  <Container>
    <EmptyState.Page
      title='Memorandums page is empty'
      image={
        <Image
          src='./jacqueline-with-flowers-1954-square.jpg'
          alt='Placeholder image'
        />
      }
    >
      No memorandums were added yet
    </EmptyState.Page>
  </Container>
)

export default DefaultExample
