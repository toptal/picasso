// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=383-13136
// source=https://github.com/toptal/picasso/blob/master/packages/base/Timeline/src/Timeline/Timeline.tsx
// component=Timeline

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Variant') === 'Bullet') {
  template = {
    id: 'Timeline',
    imports: ["import { Timeline } from '@toptal/picasso'"],
    example: figma.code`<Timeline>
      <Timeline.Row>Content</Timeline.Row>
      <Timeline.Row hasConnector={false}>Content</Timeline.Row>
    </Timeline>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Icon') {
  template = {
    id: 'Timeline',
    imports: ["import { Timeline } from '@toptal/picasso'"],
    example: figma.code`<Timeline>
      <Timeline.Row icon={<span />}>Content</Timeline.Row>
      <Timeline.Row icon={<span />} hasConnector={false}>
        Content
      </Timeline.Row>
    </Timeline>`,
  }
} else {
  template = {
    id: 'Timeline',
    imports: ["import { Timeline } from '@toptal/picasso'"],
    example: figma.code`<Timeline>
      <Timeline.Row icon={<span />}>Content</Timeline.Row>
      <Timeline.Row icon={<span />} hasConnector={false}>
        Content
      </Timeline.Row>
    </Timeline>`,
  }
}

export default template
