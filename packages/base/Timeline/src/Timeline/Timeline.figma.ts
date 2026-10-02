// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=383-13136
// source=https://github.com/toptal/picasso/blob/master/packages/base/Timeline/src/Timeline/Timeline.tsx
// component=Timeline

import figma from 'figma'

const icon = figma.selectedInstance.getEnum('Variant', {
  Icon: figma.helpers.react.jsxElement('<Check16 />'),
})

export default {
  id: 'Timeline',
  imports: [
    icon
      ? "import { Check16, Timeline } from '@toptal/picasso'"
      : "import { Timeline } from '@toptal/picasso'",
  ],
  example: figma.code`<Timeline>
  <Timeline.Row${figma.helpers.react.renderProp(
    'icon',
    icon
  )}>Content</Timeline.Row>
  <Timeline.Row${figma.helpers.react.renderProp(
    'icon',
    icon
  )} hasConnector={false}>Content</Timeline.Row>
</Timeline>`,
} satisfies CodeConnectTemplate
