// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12178
// source=https://github.com/toptal/picasso/blob/master/packages/base/Pagination/src/Pagination/Pagination.tsx
// component=Pagination

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Size') === 'Compact') {
  template = {
    id: 'Pagination',
    imports: ["import { Pagination } from '@toptal/picasso'"],
    example: figma.code`<Pagination variant='compact' activePage={1} onPageChange={() => { }}/>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Size') === 'Simple') {
  template = {
    id: 'Pagination',
    imports: ["import { Pagination } from '@toptal/picasso'"],
    example: figma.code`<Pagination activePage={1} totalPages={10} onPageChange={() => { }}/>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Size') === 'Extreme') {
  template = {
    id: 'Pagination',
    imports: ["import { Pagination } from '@toptal/picasso'"],
    example: figma.code`<Pagination activePage={5} totalPages={20} siblingCount={2} onPageChange={() => { }}/>`,
  }
} else {
  template = {
    id: 'Pagination',
    imports: ["import { Pagination } from '@toptal/picasso'"],
    example: figma.code`<Pagination activePage={5} totalPages={20} siblingCount={2} onPageChange={() => { }}/>`,
  }
}

export default template
