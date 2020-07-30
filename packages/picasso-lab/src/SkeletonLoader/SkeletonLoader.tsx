import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'

export interface Props extends BaseProps {
  rows?: number
}

const Row = () => (
  <ContentLoader viewBox='0 0 400 30'>
    <rect x='0' y='0' rx='3' ry='3' width='100' height='3' />
    <rect x='0' y='8' rx='3' ry='3' width='400' height='3' />
    <rect x='0' y='16' rx='3' ry='3' width='400' height='3' />
  </ContentLoader>
)

export const SkeletonLoader = ({ rows = 1 }: Props) => (
  <>
    {[...Array(rows)].map((_, index) => (
      <Row key={index} />
    ))}
  </>
)

SkeletonLoader.displayName = 'SkeletonLoader'

export default SkeletonLoader
