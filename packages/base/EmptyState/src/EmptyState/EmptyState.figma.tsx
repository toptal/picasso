import figma from '@figma/code-connect'
import React from 'react'
import { Button, Container, EmptyState } from '@toptal/picasso'
import { Search16 as SearchIcon } from '@toptal/picasso-icons'

const EMPTY_STATE_PAGE_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12227'

// EmptyState.Page has no CTA prop — the Figma "Primary CTA" button is
// rendered as part of children.
figma.connect(EmptyState.Page, EMPTY_STATE_PAGE_URL, {
  variant: { 'Primary CTA': true },
  example: () => (
    <EmptyState.Page image={<SearchIcon />} title='Empty State Headline'>
      Add an optional description with more context on the empty state.
      <Container top='medium'>
        <Button>Primary Action</Button>
      </Container>
    </EmptyState.Page>
  ),
})

figma.connect(EmptyState.Page, EMPTY_STATE_PAGE_URL, {
  variant: { 'Primary CTA': false },
  example: () => (
    <EmptyState.Page image={<SearchIcon />} title='Empty State Headline'>
      Add an optional description with more context on the empty state.
    </EmptyState.Page>
  ),
})

figma.connect(
  EmptyState.Collection,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12264',
  {
    example: () => (
      <EmptyState.Collection>
        No items for selected search criteria.
      </EmptyState.Collection>
    ),
  }
)
