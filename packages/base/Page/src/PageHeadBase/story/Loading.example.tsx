import React from 'react'
import { Badge, PageHeadBase, SkeletonLoader } from '@toptal/picasso'
import { TagRectangular } from '@toptal/picasso-tag'

const isLoading = true

const Loading = () => (
  <PageHeadBase
    title='Heading large'
    subtitle='Description'
    subtitleLoading={isLoading}
    titleAdornments={[
      isLoading ? (
        <SkeletonLoader.Typography style={{ width: '20px' }} />
      ) : (
        <Badge variant='white' content={1} />
      ),
      <TagRectangular variant='green'>Label</TagRectangular>,
    ]}
  />
)

export default Loading
