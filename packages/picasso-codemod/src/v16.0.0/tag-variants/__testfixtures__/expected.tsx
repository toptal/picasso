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
    <Tag {...defaultProps} variant='red'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='blue'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='green'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='yellow'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='light-grey'>
      Label
    </Tag>
    <Tag {...defaultProps}>Label</Tag>
  </>
)
