import figma from '@figma/code-connect'
import React from 'react'
import { Pagination } from '@toptal/picasso'

const PAGINATION_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12178'

figma.connect(Pagination, PAGINATION_URL, {
  variant: { Size: 'Compact' },
  props: {},
  example: () => (
    <Pagination variant='compact' activePage={1} onPageChange={() => {}} />
  ),
})

figma.connect(Pagination, PAGINATION_URL, {
  variant: { Size: 'Simple' },
  props: {},
  example: () => (
    <Pagination activePage={1} totalPages={10} onPageChange={() => {}} />
  ),
})

figma.connect(Pagination, PAGINATION_URL, {
  variant: { Size: 'Extreme' },
  props: {},
  example: () => (
    <Pagination
      activePage={5}
      totalPages={20}
      siblingCount={2}
      onPageChange={() => {}}
    />
  ),
})
