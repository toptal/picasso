// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=9669-34027
// source=https://github.com/toptal/picasso/blob/master/packages/base/SkeletonLoader/src/SkeletonLoader/SkeletonLoader.tsx
// component=SkeletonLoader.Media

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Variant') === 'Square') {
  template = {
    id: 'SkeletonLoader.Media',
    imports: ["import { SkeletonLoader } from '@toptal/picasso'"],
    example: figma.code`<SkeletonLoader.Media variant='image' width={80} height={80}/>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Circle') {
  template = {
    id: 'SkeletonLoader.Media',
    imports: ["import { SkeletonLoader } from '@toptal/picasso'"],
    example: figma.code`<SkeletonLoader.Media variant='image' circle width={80} height={80}/>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Button') {
  template = {
    id: 'SkeletonLoader.Button',
    imports: ["import { SkeletonLoader } from '@toptal/picasso'"],
    example: figma.code`<SkeletonLoader.Button />`,
  }
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Text Line') {
  template = {
    id: 'SkeletonLoader.Typography',
    imports: ["import { SkeletonLoader } from '@toptal/picasso'"],
    example: figma.code`<SkeletonLoader.Typography rows={1}/>`,
  }
} else {
  template = {
    id: 'SkeletonLoader.Typography',
    imports: ["import { SkeletonLoader } from '@toptal/picasso'"],
    example: figma.code`<SkeletonLoader.Typography rows={1}/>`,
  }
}

export default template
