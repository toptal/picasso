import React from 'react'
import figma from '@figma/code-connect'
import { QueryBuilder } from '@toptal/picasso-query-builder'

figma.connect(
  QueryBuilder,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12510-43013',
  {
    example: () => (
      <QueryBuilder
        fields={[]}
        query={{ combinator: 'and', rules: [] }}
        onQueryChange={() => {}}
      />
    ),
  }
)
