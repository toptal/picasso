// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=19751-12221
// source=https://github.com/toptal/picasso/blob/master/packages/base/Page/src/PageHead/PageHead.tsx
// component=PageHead

import figma from 'figma'

const noBorder = figma.selectedInstance.getBoolean('Separator', {
  true: false,
  false: true,
})

export default {
  id: 'PageHead',
  imports: ["import { PageHead } from '@toptal/picasso'"],
  example: figma.code`<PageHead${figma.helpers.react.renderProp(
    'noBorder',
    noBorder
  )}>
        <PageHead.Main>
          <PageHead.Title>Page Title</PageHead.Title>
        </PageHead.Main>
      </PageHead>`,
  metadata: { nestable: true },
}
