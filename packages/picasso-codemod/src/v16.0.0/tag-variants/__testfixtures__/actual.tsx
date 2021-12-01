// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Tag } from '@toptal/picasso'

const defaultProps = {
  'data-testid': 'foo',
  className: 'bar',
  style: { position: 'absolute' }
}

export default () => (
  <>
    <Tag {...defaultProps} variant='negative'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='primary'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='positive'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='warning'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='light'>
      Label
    </Tag>
    <Tag {...defaultProps}>Label</Tag>
  </>
)
