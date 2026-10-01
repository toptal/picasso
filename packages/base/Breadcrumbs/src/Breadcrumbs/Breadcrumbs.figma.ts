// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=122-2162
// source=https://github.com/toptal/picasso/blob/master/packages/base/Breadcrumbs/src/BreadcrumbsCompound/index.ts
// component=Breadcrumbs

import figma from 'figma'

const count =
  figma.selectedInstance.getEnum('# of items', {
    '2 items': 2,
    '3 items': 3,
    '4 items': 4,
    '5 items': 5,
  }) ?? 3
const hasCurrent =
  figma.selectedInstance.getPropertyValue('Style') === 'Current'

const parents = ['Home', 'Section', 'Subsection', 'Detail', 'Page']
  .slice(0, hasCurrent ? count - 1 : count)
  .map(
    label =>
      `  <Breadcrumbs.Item as={Link} href='#' variant='action' active={false}>${label}</Breadcrumbs.Item>`
  )
const items = hasCurrent
  ? [...parents, '  <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>']
  : parents

export default {
  id: 'Breadcrumbs',
  imports: ["import { Breadcrumbs, Link } from '@toptal/picasso'"],
  example: figma.code`<Breadcrumbs>
${items.join('\n')}
</Breadcrumbs>`,
} satisfies CodeConnectTemplate
