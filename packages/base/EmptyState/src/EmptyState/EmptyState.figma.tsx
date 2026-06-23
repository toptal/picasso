import figma from '@figma/code-connect'
import React from 'react'
import { EmptyState } from '@toptal/picasso'
import { Search16 as SearchIcon } from '@toptal/picasso-icons'

figma.connect(
  EmptyState.Page,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12227',
  {
    props: {
      children: figma.boolean('Primary CTA', {
        true: 'Add an optional description with more context on the empty state.',
        false: 'No items to display.',
      }),
    },
    example: ({ children }) => (
      <EmptyState.Page image={<SearchIcon />} title='Empty State Headline'>
        {children}
      </EmptyState.Page>
    ),
  }
)

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
