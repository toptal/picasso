// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12510-43013
// source=https://github.com/toptal/picasso/blob/master/packages/picasso-query-builder/src/QueryBuilder/QueryBuilder.tsx
// component=QueryBuilder

import figma from 'figma'

export default {
  id: 'QueryBuilder',
  imports: ["import { QueryBuilder } from '@toptal/picasso-query-builder'"],
  example: figma.code`<QueryBuilder fields={[]} query={{ combinator: 'and', rules: [] }} onQueryChange={() => { }}/>`,
} satisfies CodeConnectTemplate
