// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=9669-34027
// source=https://github.com/toptal/picasso/blob/master/packages/base/SkeletonLoader/src/SkeletonLoader/SkeletonLoader.tsx
// component=SkeletonLoader.Media

import figma from 'figma'

const variant = figma.selectedInstance.getPropertyValue('Variant')

const templates: Record<
  string,
  { id: string; example: ReturnType<typeof figma.code> }
> = {
  Square: {
    id: 'SkeletonLoader.Media',
    example: figma.code`<SkeletonLoader.Media variant='image' width={80} height={80} />`,
  },
  Circle: {
    id: 'SkeletonLoader.Media',
    example: figma.code`<SkeletonLoader.Media variant='image' circle width={80} height={80} />`,
  },
  Button: {
    id: 'SkeletonLoader.Button',
    example: figma.code`<SkeletonLoader.Button />`,
  },
  'Text Line': {
    id: 'SkeletonLoader.Typography',
    example: figma.code`<SkeletonLoader.Typography rows={1} />`,
  },
}
const template = templates[String(variant)]

export default (template
  ? {
      ...template,
      imports: ["import { SkeletonLoader } from '@toptal/picasso'"],
    }
  : {
      id: 'SkeletonLoader.Media',
      imports: [],
      // Stepper and Pagination have no SkeletonLoader equivalent
      example: figma.code`// Not mapped: no SkeletonLoader equivalent for this variant`,
    }) satisfies CodeConnectTemplate
