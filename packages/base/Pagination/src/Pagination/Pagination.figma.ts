// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12178
// source=https://github.com/toptal/picasso/blob/master/packages/base/Pagination/src/Pagination/Pagination.tsx
// component=Pagination

import figma from 'figma'

const size = figma.selectedInstance.getPropertyValue('Size')

export default {
  id: 'Pagination',
  imports: ["import { Pagination } from '@toptal/picasso'"],
  example:
    size === 'Compact'
      ? figma.code`<Pagination variant='compact' activePage={1} onPageChange={() => {}} />`
      : size === 'Extreme'
      ? figma.code`<Pagination activePage={5} totalPages={20} siblingCount={2} onPageChange={() => {}} />`
      : figma.code`<Pagination activePage={1} totalPages={10} onPageChange={() => {}} />`,
}
