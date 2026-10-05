import figma from '@figma/code-connect'
import React from 'react'
import { PageHead } from '@toptal/picasso'

figma.connect(
  PageHead,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=19751-12221',
  {
    props: {
      noBorder: figma.boolean('Separator', { true: false, false: true }),
    },
    example: ({ noBorder }) => (
      <PageHead noBorder={noBorder}>
        <PageHead.Main>
          <PageHead.Title>Page Title</PageHead.Title>
        </PageHead.Main>
      </PageHead>
    ),
  }
)
