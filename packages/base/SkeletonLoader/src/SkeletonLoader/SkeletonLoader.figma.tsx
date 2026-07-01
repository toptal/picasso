import figma from '@figma/code-connect'
import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'

const SKELETON_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=9669-34027'

// Stepper and Pagination Figma variants have no direct Picasso SkeletonLoader equivalent.

figma.connect(SkeletonLoader.Media, SKELETON_URL, {
  variant: { Variant: 'Square' },
  example: () => (
    <SkeletonLoader.Media variant='image' width={80} height={80} />
  ),
})

figma.connect(SkeletonLoader.Media, SKELETON_URL, {
  variant: { Variant: 'Circle' },
  example: () => (
    <SkeletonLoader.Media variant='image' circle width={80} height={80} />
  ),
})

figma.connect(SkeletonLoader.Button, SKELETON_URL, {
  variant: { Variant: 'Button' },
  example: () => <SkeletonLoader.Button />,
})

figma.connect(SkeletonLoader.Typography, SKELETON_URL, {
  variant: { Variant: 'Text Line' },
  example: () => <SkeletonLoader.Typography rows={1} />,
})
