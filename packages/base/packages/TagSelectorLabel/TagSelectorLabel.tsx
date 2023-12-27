/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef } from 'react'
import Tag from '@toptal/picasso-tag'
import type { Props as TagProps } from '@toptal/picasso-tag/-tag'

export const TagSelectorLabel = forwardRef<HTMLDivElement, TagProps>(
  function TagSelectorLabel(props, ref) {
    const { children, ...rest } = props

    return (
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    )
  }
)

TagSelectorLabel.defaultProps = {}

TagSelectorLabel.displayName = 'TagSelectorLabel'

export default TagSelectorLabel
