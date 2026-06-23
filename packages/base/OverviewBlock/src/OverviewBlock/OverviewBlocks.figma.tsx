import figma from '@figma/code-connect'
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const OVERVIEW_BLOCK_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=17455-8930'

figma.connect(OverviewBlock.Group, OVERVIEW_BLOCK_URL, {
  variant: { Variant: 'Default' },
  example: () => (
    <OverviewBlock.Group>
      <OverviewBlock value='4249' label='Label' />
      <OverviewBlock value='19302' label='Label' />
      <OverviewBlock value='979' label='Label' />
    </OverviewBlock.Group>
  ),
})

figma.connect(OverviewBlock.Group, OVERVIEW_BLOCK_URL, {
  variant: { Variant: 'Multi-line' },
  example: () => (
    <OverviewBlock.Group>
      <OverviewBlock.Row>
        <OverviewBlock value='4249' label='Label' />
        <OverviewBlock value='19302' label='Label' />
      </OverviewBlock.Row>
      <OverviewBlock.Row>
        <OverviewBlock value='979' label='Label' />
        <OverviewBlock value='803' label='Label' />
      </OverviewBlock.Row>
    </OverviewBlock.Group>
  ),
})

figma.connect(OverviewBlock.Group, OVERVIEW_BLOCK_URL, {
  variant: { Variant: 'Empty state' },
  example: () => (
    <OverviewBlock.Group>
      <OverviewBlock value='-' label='Label' />
    </OverviewBlock.Group>
  ),
})
