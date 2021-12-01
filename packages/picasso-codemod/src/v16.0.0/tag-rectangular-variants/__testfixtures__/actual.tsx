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
    <Tag.Rectangular {...defaultProps} variant='negative'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='warning'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='positive'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='dark'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='light'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='negative'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='warning'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='positive'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='primary'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='light'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps}>Label</Tag.Rectangular>
  </>
)
