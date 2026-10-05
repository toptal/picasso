import figma from '@figma/code-connect'
import React from 'react'
import { Timeline } from '@toptal/picasso'

const TIMELINE_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=383-13136'

figma.connect(Timeline, TIMELINE_URL, {
  variant: { Variant: 'Bullet' },
  example: () => (
    <Timeline>
      <Timeline.Row>Content</Timeline.Row>
      <Timeline.Row hasConnector={false}>Content</Timeline.Row>
    </Timeline>
  ),
})

figma.connect(Timeline, TIMELINE_URL, {
  variant: { Variant: 'Icon' },
  example: () => (
    <Timeline>
      <Timeline.Row icon={<span />}>Content</Timeline.Row>
      <Timeline.Row icon={<span />} hasConnector={false}>
        Content
      </Timeline.Row>
    </Timeline>
  ),
})
