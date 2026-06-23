import figma from '@figma/code-connect'
import React from 'react'
import { Tabs } from '@toptal/picasso'

figma.connect(
  Tabs,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=246-11213',
  {
    example: () => (
      <Tabs value={0} onChange={() => {}}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    ),
  }
)

figma.connect(
  Tabs,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=1405-15300',
  {
    example: () => (
      <Tabs value={0} onChange={() => {}} orientation='vertical'>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    ),
  }
)

figma.connect(
  Tabs,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=14488-4136',
  {
    example: () => (
      <Tabs value={0} onChange={() => {}} variant='fullWidth'>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    ),
  }
)
