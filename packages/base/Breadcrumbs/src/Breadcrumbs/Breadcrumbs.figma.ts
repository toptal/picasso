// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=122-2162
// source=https://github.com/toptal/picasso/blob/master/packages/base/Breadcrumbs/src/BreadcrumbsCompound/index.ts
// component=Breadcrumbs

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (
  figma.selectedInstance.getPropertyValue('Style') === 'Current' &&
  figma.selectedInstance.getPropertyValue('# of items') === '2 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Current' &&
  figma.selectedInstance.getPropertyValue('# of items') === '3 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Current' &&
  figma.selectedInstance.getPropertyValue('# of items') === '4 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Current' &&
  figma.selectedInstance.getPropertyValue('# of items') === '5 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Parents' &&
  figma.selectedInstance.getPropertyValue('# of items') === '2 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Parents' &&
  figma.selectedInstance.getPropertyValue('# of items') === '3 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Parents' &&
  figma.selectedInstance.getPropertyValue('# of items') === '4 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else if (
  figma.selectedInstance.getPropertyValue('Style') === 'Parents' &&
  figma.selectedInstance.getPropertyValue('# of items') === '5 items'
) {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Page</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
} else {
  template = {
    id: 'Breadcrumbs',
    imports: ["import { Breadcrumbs } from '@toptal/picasso'"],
    example: figma.code`<Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Page</Breadcrumbs.Item>
    </Breadcrumbs>`,
  }
}

export default template
